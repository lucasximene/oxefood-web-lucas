import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';


export default function FormCategoriaProduto() {
    const { state } = useLocation();
    const [idCategoriaProduto, setIdCategoriaProduto] = useState();
    const [descricaoCategoria, setDescricaoCategoria] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8082/api/categoriaproduto/" + state.id)
                .then((response) => {
                    setIdCategoriaProduto(response.data.id)
                    setDescricaoCategoria(response.data.descricaoCategoria)
                })
        }
    }, [state])


    function salvar() {


        let categoriaProdutoRequest = {
            descricaoCategoria: descricaoCategoria,
        }


        if (idCategoriaProduto != null) { //Alteração:
            axios.put("http://localhost:8082/api/categoriaproduto/" + idCategoriaProduto, categoriaProdutoRequest)
                .then((response) => { console.log('Categoria de produto alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alterar uma categoria de produto.') })
        } else { //Cadastro:
            axios.post("http://localhost:8082/api/categoriaproduto", categoriaProdutoRequest)
                .then((response) => { console.log('Categoria de produto cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir a categoria de produto.') })
        }
    }


    return (


        <div>


            <MenuSistema tela={'categoriaproduto'} />




            <div style={{ marginTop: '3%' }}>


                <Container textAlign='justified' >


                    {idCategoriaProduto === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Categoria de Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idCategoriaProduto !== undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Categoria de Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }


                    <Divider />


                    <div style={{ marginTop: '4%' }}>


                        <Form>


                            <Form.Group widths='equal'>


                                <Form.Input
                                    required
                                    fluid
                                    label='Descrição'
                                    maxLength="100"
                                    value={descricaoCategoria}
                                    onChange={e => setDescricaoCategoria(e.target.value)}
                                />


                            </Form.Group>
                        </Form>
                        <div style={{ marginTop: '4%' }}>


                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                <Link to={'/list-categoriaproduto'}>Voltar</Link>
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
