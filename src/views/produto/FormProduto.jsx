import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';


export default function FormProduto() {
    const { state } = useLocation();
    const [idProduto, setIdProduto] = useState();
    const [titulo, setTitulo] = useState('');
    const [codigo, setCodigo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valorUnitario, setValorUnitario] = useState('');
    const [tempoDeEntregaMinimoEmMinutos, setTempoDeEntregaMinimoEmMinutos] = useState('');
    const [tempoDeEntregaMaximoEmMinutos, setTempoDeEntregaMaximoEmMinutos] = useState('');
    const [listaCategoria, setListaCategoria] = useState([]);
    const [idCategoria, setIdCategoria] = useState('');


    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8082/api/produto/" + state.id)
                .then((response) => {
                    setIdProduto(response.data.id);
                    setTitulo(response.data.titulo);
                    setCodigo(response.data.codigo);
                    setDescricao(response.data.descricao);
                    setValorUnitario(response.data.valorUnitario);
                    setTempoDeEntregaMinimoEmMinutos(response.data.tempoDeEntregaMinimoEmMinutos);
                    setTempoDeEntregaMaximoEmMinutos(response.data.tempoDeEntregaMaximoEmMinutos);
                    setIdCategoria(response.data.categoria.id);
                })
                .catch((error) => console.error('Erro ao buscar o produto:', error));
        }


        axios.get("http://localhost:8082/api/categoriaproduto")
            .then((response) => {
                const dropDownCategorias = response.data.map(c => ({
                    key: c.id,
                    text: c.descricaoCategoria,
                    value: c.id
                }));
                setListaCategoria(dropDownCategorias);
            })
            .catch((error) => console.error('Erro ao buscar categorias:', error));
    }, [state]);


    function salvar() {
        const produtoRequest = {
            idCategoria: idCategoria,
            titulo: titulo,
            codigo: codigo,
            descricao: descricao,
            valorUnitario: valorUnitario,
            tempoDeEntregaMinimoEmMinutos: tempoDeEntregaMinimoEmMinutos,
            tempoDeEntregaMaximoEmMinutos: tempoDeEntregaMaximoEmMinutos
        };


        const url = idProduto != null
            ? `http://localhost:8082/api/produto/${idProduto}`
            : "http://localhost:8082/api/produto";


        const method = idProduto != null ? axios.put : axios.post;


        method(url, produtoRequest)
            .then(() => {
                console.log('Produto salvo com sucesso.');
            })
            .catch((error) => {
                console.error('Erro ao salvar o produto:', error);
            });
    }


    return (
        <div>
            <MenuSistema tela={'produto'} />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    <h2>
                        <span style={{ color: 'darkgray' }}>
                            Produto &nbsp;<Icon name='angle double right' size="small" />
                        </span> {idProduto === undefined ? 'Cadastro' : 'Alteração'}
                    </h2>
                    <Divider />
                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    maxLength="100">
                                    <InputMask
                                        placeholder="Informe o título do produto"
                                        value={titulo}
                                        onChange={e => setTitulo(e.target.value)}
                                    />
                                </Form.Input>


                                <Form.Input
                                    required
                                    fluid
                                    label='Código do Produto'>
                                    <InputMask
                                        placeholder="Informe o código do produto"
                                        value={codigo}
                                        onChange={e => setCodigo(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>
                            <Form.Select
                                    required
                                    fluid
                                    tabIndex='3'
                                    placeholder='Selecione'
                                    label='Categoria'
                                    options={listaCategoria}
                                    value={idCategoria}
                                    onChange={(e, { value }) => {
                                        setIdCategoria(value);
                                    }}
                                />
                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Descrição'
                                    width={16}>
                                    <InputMask
                                        placeholder="Informe a descrição do produto"
                                        value={descricao}
                                        onChange={e => setDescricao(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>


                            <Form.Group>
                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Unitário'
                                    width={6}>
                                    <InputMask
                                        placeholder="Informe o valor unitário"
                                        value={valorUnitario}
                                        onChange={e => setValorUnitario(e.target.value)}
                                    />
                                </Form.Input>


                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Mínimo em Minutos'
                                    width={6}>
                                    <InputMask
                                        placeholder="30"
                                        value={tempoDeEntregaMinimoEmMinutos}
                                        onChange={e => setTempoDeEntregaMinimoEmMinutos(e.target.value)}
                                    />
                                </Form.Input>


                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máxima em Minutos'
                                    width={6}>
                                    <InputMask
                                        placeholder="40"
                                        value={tempoDeEntregaMaximoEmMinutos}
                                        onChange={e => setTempoDeEntregaMaximoEmMinutos(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>
                        </Form>


                        <div style={{ marginTop: '4%' }}>
                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'>
                                <Icon name='reply' />
                                <Link to={'/list-produto'}>Voltar</Link>
                            </Button>


                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={salvar}>
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
