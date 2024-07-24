import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Container, Divider, Icon, Table, Modal, Header } from "semantic-ui-react"
import MenuSistema from "../../MenuSistema"

export default function ListCategoriaProduto() {
  const [lista, setLista] = useState([])
  const [openModal, setOpenModal] = useState(false);
   const [idRemover, setIdRemover] = useState();


  useEffect(() => {
    carregarLista()
  }, [])

  function carregarLista() {
    axios.get("http://localhost:8082/api/categoriaproduto").then((response) => {
      setLista(response.data)
    })
  }
  function confirmaRemover(id) {
    setOpenModal(true)
    setIdRemover(id)
}
async function remover() {

  await axios.delete('http://localhost:8082/api/categoriaproduto/' + idRemover)
  .then((response) => {

      console.log('Produto removido com sucesso.')

      axios.get("http://localhost:8082/api/categoriaproduto")
      .then((response) => {
          setLista(response.data)
      })
  })
  .catch((error) => {
      console.log('Erro ao remover uma categoria de produto.')
  })
  setOpenModal(false)
}


  
  return (
    <div>
      <MenuSistema tela={"categoria"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign='justified'>
          <h2> Categoria </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label='Novo'
              circular
              color='orange'
              icon='clipboard outline'
              floated='right'
              as={Link}
              to='/form-categoriaproduto'
            />

            <br />
            <br />
            <br />

            <Table
              color='orange'
              sortable
              celled
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Codigo</Table.HeaderCell>
                  <Table.HeaderCell>Categoria</Table.HeaderCell>

                  <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((categoriaproduto) => (
                  <Table.Row key={categoriaproduto.id}>
                    <Table.Cell>{categoriaproduto.codigo}</Table.Cell>
                    <Table.Cell>{categoriaproduto.categoria.descricao}</Table.Cell>
                    
                    <Table.Cell textAlign='center'>
                      <Button
                        inverted
                        circular
                        color='green'
                        title='Clique aqui para editar os dados dessa categoria de produto'
                        icon>
                        <Link to="/form-produto" state={{id: categoriaproduto.id}} style={{color: 'green'}}> <Icon name='edit' /> </Link>
                      </Button>
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color='red'
                        title='Clique aqui para remover esta categoria de produto'
                        icon
                        onClick={e => confirmaRemover(categoriaproduto.id)}
                      >
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