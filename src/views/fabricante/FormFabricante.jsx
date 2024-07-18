import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormFabricante () {

    const { state } = useLocation();
    const [idFabricante, setIdFabricante] = useState();

    const [nome, setNome] = useState();
    const [endereco, setEndereco] = useState();
    const [valorMercado, setValorMercado] = useState();
    const [paginaWeb, setPaginaWeb] = useState();
    const [qtdFuncionarios, setQtdFuncionarios] = useState();
    const [inicioContrato, setInicioContrato] = useState();
 
    useEffect(() => {

        if (state != null && state.id != null) {

            axios.get("http://localhost:8082/api/fabricante/" + state.id)
            .then((response) => {
                setIdFabricante(response.data.id)
                setNome(response.data.nome)
                setEndereco(response.data.endereco)
                setValorMercado(response.data.valorMercado)
                setPaginaWeb(response.data.paginaWeb)
                setQtdFuncionarios(response.data.qtdFuncionarios)
                setInicioContrato(formatarData(response.data.inicioContrato))
            })
        }

    }, [state])

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }
    
        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    function salvar() {

		let fabricanteRequest = {
		     nome: nome,
		     endereco: endereco,
		     valorMercado: valorMercado,
		     paginaWeb: paginaWeb,
             qtdFuncionarios: qtdFuncionarios,
		     inicioContrato: inicioContrato
		}

        console.log(fabricanteRequest)
	
        if (idFabricante != null) { //Alteração:

            axios.put("http://localhost:8082/api/fabricante/" + idFabricante, fabricanteRequest)
            .then((response) => { 
                console.log('Fabricante alterado com sucesso.') })
            .catch((error) => { 
                console.log('Erro ao alter um fabricante.') })
        
        } else { //Cadastro:

            axios.post("http://localhost:8082/api/fabricante", fabricanteRequest)
            .then((response) => { 
                console.log('Fabricante cadastrado com sucesso.') })
            .catch((error) => { 
                console.log('Erro ao incluir o fabricante.') })
        }
 
	}

    return (

        <div>
            <MenuSistema tela={'Fabricante'} />
            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    { idFabricante === undefined &&
                        <h2> <span style={{color: 'darkgray'}}> Fabricante &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    { idFabricante != undefined &&
                        <h2> <span style={{color: 'darkgray'}}> Fabricante &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Endereço'
                                    value={endereco}
                                    onChange={e => setEndereco(e.target.value)}>
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Valor de Mercado'
                                    width={6}>
                                    <InputMask 
                                        value={valorMercado}
                                        onChange={e => setValorMercado(e.target.value)}
                                    /> 
                                </Form.Input>

                            </Form.Group>
                            
                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Página Web'
                                    width={6}>
                                    <InputMask 
                                        placeholder="www."
                                        value={paginaWeb}
                                        onChange={e => setPaginaWeb(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Quantidade de Funcionários'
                                    width={6}>
                                    <InputMask 
                                        value={qtdFuncionarios}
                                        onChange={e => setQtdFuncionarios(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Inicio de Contrato'
                                    width={6}>
                                    <InputMask 
                                        mask="99/99/9999" 
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={inicioContrato}
                                        onChange={e => setInicioContrato(e.target.value)}
                                    /> 
                                </Form.Input>

                            </Form.Group>
                        
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                <Link to={'/list-Fabricante'}>Voltar</Link>
                            </Button>
                                
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>
                    
                </Container>
            </div>
        </div>

    );

}
