import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListFabricante () {

   const [lista, setLista] = useState([]);
   const [openModal, setOpenModal] = useState(false);
   const [idRemover, setIdRemover] = useState();

   useEffect(() => {
       carregarLista();
   }, [])

   function carregarLista() {

       axios.get("http://localhost:8082/api/fabricante")
       .then((response) => {
           setLista(response.data)
       })
   }
   function formatarData(dataParam) {

    if (dataParam === null || dataParam === '' || dataParam === undefined) {
        return ''
    }

    let arrayData = dataParam.split('-');
    return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }
    
    async function remover() {

        await axios.delete('http://localhost:8082/api/fabricante/' + idRemover)
        .then((response) => {
  
            console.log('Fabricante removido com sucesso.')
  
            axios.get("http://localhost:8082/api/fabricante")
            .then((response) => {
                setLista(response.data)
            })
        })
        .catch((error) => {
            console.log('Erro ao remover um fabricante.')
        })
        setOpenModal(false)
    }
 

return(
    <div>
        <MenuSistema tela={'fabricante'} />
        <div style={{marginTop: '3%'}}>

            <Container textAlign='justified' >

                <h2> Fabricanter </h2>
                <Divider />

                <div style={{marginTop: '4%'}}>
                    <Button
                        label='Novo'
                        circular
                        color='orange'
                        icon='clipboard outline'
                        floated='right'
                        as={Link}
                        to='/form-fabricante'
                    />
                       <br/><br/><br/>
                  
                  <Table color='orange' sortable celled>

                      <Table.Header>
                          <Table.Row>
                              <Table.HeaderCell>Nome</Table.HeaderCell>
                              <Table.HeaderCell>Endereço</Table.HeaderCell>
                              <Table.HeaderCell>Valor de Mercado</Table.HeaderCell>
                              <Table.HeaderCell>Pagina Web</Table.HeaderCell>
                              <Table.HeaderCell>Quantidade de Funcionários</Table.HeaderCell>
                              <Table.HeaderCell>Inicio de Contrato</Table.HeaderCell>
                              <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                          </Table.Row>
                      </Table.Header>
                 
                      <Table.Body>

                          { lista.map(fabricante => (

                              <Table.Row key={fabricante.id}>
                                  <Table.Cell>{fabricante.nome}</Table.Cell>
                                  <Table.Cell>{fabricante.endereco}</Table.Cell>
                                  <Table.Cell>{fabricante.valorMercado}</Table.Cell>
                                  <Table.Cell>{fabricante.paginaWeb}</Table.Cell>
                                  <Table.Cell>{fabricante.qtdFuncionarios}</Table.Cell>
                                  <Table.Cell>{formatarData(fabricante.inicioContrato)}</Table.Cell>
                                  <Table.Cell textAlign='center'>

                                      <Button
                                            inverted
                                            circular
                                            color='green'
                                            title='Clique aqui para editar os dados deste fabricante'
                                            icon>
                                                <Link to="/form-fabricante" state={{id: fabricante.id}} style={{color: 'green'}}> <Icon name='edit' /> </Link>
                                      </Button> &nbsp;
                          
                                      <Button
                                               inverted
                                               circular
                                               color='red'
                                               title='Clique aqui para remover este fabricante'
                                               icon
                                               onClick={e => confirmaRemover(fabricante.id)}>
                                                   <Icon name='trash' />
                                           </Button>

                                       </Table.Cell>
                                   </Table.Row>
                               ))}

                           </Table.Body>
                       </Table>
                   </div>
               </Container>
           </div>
           <Modal
               basic
               onClose={() => setOpenModal(false)}
               onOpen={() => setOpenModal(true)}
               open={openModal}
                >
               <Header icon>
                   <Icon name='trash' />
                   <div style={{marginTop: '5%'}}> Tem certeza que deseja remover esse registro? </div>
               </Header>
               <Modal.Actions>
                   <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                       <Icon name='remove' /> Não
                   </Button>
                   <Button color='green' inverted onClick={() => remover()}>
                       <Icon name='checkmark' /> Sim
                   </Button>
               </Modal.Actions>
         </Modal>

       </div>
   )
}
