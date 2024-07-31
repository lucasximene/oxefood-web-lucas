import React, { useState, useEffect } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon, FormTextArea } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";

export default function FormCategoriaProduto() {
    const { state } = useLocation();
    const [idCategoria, setIdCategoria] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8082/api/categoriaproduto/" + state.id)
                .then((response) => {
                    setIdCategoria(response.data.categoria.id)
                })
        }
        axios.get(ENDERECO_API + "api/categoriaproduto")
        .then((response) => {
            const dropDownCategorias = response.data.map(c => ({ text: categoria.descricao, value: categoria.id }));
            setListaCategoria(dropDownCategorias);
        })
 
    }, [state])

    const [listaCategoria, setListaCategoria] = useState([]);

 
    function salvar() {

        let categoriaprodutoRequest = {
            idCategoria: idCategoria,
            categoria: categoria

        }
        if (idProduto != null) { //Alteração:
            axios.put("http://localhost:8082/api/categoriaproduto/" + idCategoria, categoriaRequest)
                .then((response) => { console.log('Categoria de Produto alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alterar uma Categoria de Produto.') })
        } else { //Cadastro:
            axios.post("http://localhost:8082/api/categoriaproduto", categoriaprodutoRequest)
                .then((response) => { console.log('Categoria de Produto cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir a Categoria de Produto.') })
        }
    }



    return (

        <div>

            <MenuSistema tela={'categoria'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {idCategoria === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Categoria &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idCategoria !== undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Categoria &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }


                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Categoria de Produto'
                                    maxLength="100"
                                >
                                    <InputMask
                                        placeholder="Informe a Categoria do Produto"
                                        value={categoria}
                                        onChange={e => setCategoria(e.target.value)}

                                    />
                                </Form.Input>

                            </Form.Group>


                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Link to={'/list-produto'} >
                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                Voltar
                            </Button>
                            </Link>

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