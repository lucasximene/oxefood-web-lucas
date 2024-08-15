import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon, FormSelect} from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import {mensagemErro, notifyError, notifySuccess } from '../../views/util/Util';


const ufList = [
    { key: 'ac', value: 'ac', text: 'Acre' },
    { key: 'al', value: 'al', text: 'Alagoas' },
    { key: 'ap', value: 'ap', text: 'Amapá' },
    { key: 'am', value: 'am', text: 'Amazonas' },
    { key: 'ba', value: 'ba', text: 'Bahia' },
    { key: 'ce', value: 'ce', text: 'Ceara' },
    { key: 'df', value: 'df', text: 'Distrito Federal' },
    { key: 'es', value: 'es', text: 'Espírito Santo' },
    { key: 'go', value: 'go', text: 'Goiás' },
    { key: 'ma', value: 'ma', text: 'Maranhão' },
    { key: 'mt', value: 'mt', text: 'Mato Grosso' },
    { key: 'ms', value: 'ms', text: 'Mato Grosso do Sul' },
    { key: 'mg', value: 'mg', text: 'Minas Gerais' },
    { key: 'pa', value: 'pa', text: 'Pará' },
    { key: 'pb', value: 'pb', text: 'Paraiba' },
    { key: 'pr', value: 'pr', text: 'Paraná' },
    { key: 'pe', value: 'pe', text: 'Pernambuco' },
    { key: 'pi', value: 'pi', text: 'Piauí' },
    { key: 'rj', value: 'rj', text: 'Rio de Janeiro' },
    { key: 'rn', value: 'rn', text: 'Rio Grande do Norte' },
    { key: 'rr', value: 'rr', text: 'Rondônia' },
    { key: 'sc', value: 'sc', text: 'Santa Catarina' },
    { key: 'sp', value: 'sp', text: 'São Paulo' },
    { key: 'se', value: 'se', text: 'Sergipe' },
    { key: 'to', value: 'to', text: 'Tocantins' },
]

export default function FormEntregador() {
    const { state } = useLocation();
    const [idEntregador, setIdEntregador] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8082/api/entregador/" + state.id)
                .then((response) => {
                    setIdEntregador(response.data.id)
                    setNome(response.data.nome)
                    setCpf(response.data.cpf)
                    setRG(response.data.rg)
                    setDataNascimento(response.data.dataNascimento)
                    setFoneCelular(response.data.foneCelular)
                    setFoneFixo(formatarData(response.data.foneFixo))
                    setQtdEntregasRealizadas(response.data.qtdEntregasRealizadas)
                    setValorFrete(response.data.valorFrete)
                    setEnderecoNumero(response.data.enderecoNumero)
                    setEnderecoRua(response.data.enderecoRua)
                    setEnderecoBairro(response.data.enderecoBairro)
                    setEnderecoCidade(response.data.enderecoCidade)
                    setEnderecoCep(response.data.enderecoCep)
                    setEnderecoUf(response.data.enderecoUf)
                    setEnderecoCompleto(response.data.enderecoCompleto)
                    setAtivo(response.data.ativo)
                })
        }
    }, [state])

    function formatarData(dataParam) {
        if (dataParam === null || dataParam === "" || dataParam === undefined) {
          return ""
        }
    
        let arrayData = dataParam.split("-")
        return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0]
      }


    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRG] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [enderecoRua, setEnderecoRua] = useState();
    const [enderecoNumero, setEnderecoNumero] = useState();
    const [enderecoBairro, setEnderecoBairro] = useState();
    const [enderecoCidade, setEnderecoCidade] = useState();
    const [enderecoCep, setEnderecoCep] = useState();
    const [enderecoUf, setEnderecoUf] = useState();
    const [enderecoCompleto, setEnderecoCompleto] = useState();
    const [ativo, setAtivo] = useState();

    function salvar() {

        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qtdEntregasRealizadas: qtdEntregasRealizadas,
            valorFrete: valorFrete,
            enderecoRua: enderecoRua,
            enderecoNumero: enderecoNumero,
            enderecoBairro: enderecoBairro,
            enderecoCidade: enderecoCidade,
            enderecoCep: enderecoCep,
            enderecoUf: enderecoUf,
            enderecoCompleto: enderecoCompleto,
            ativo: ativo
        }

        if (idEntregador != null) { //Alteração:
            axios.put("http://localhost:8082/api/entregador/" + idEntregador, entregadorRequest)
                .then((response) => { notifySuccess('Entregador alterado com sucesso.') })
                .catch((error) => { if (error.response) {
                    notifyError(error.response.data.message)
                    } else {
                    notifyError(mensagemErro)
                    }  })
        } else { //Cadastro:
            axios.post("http://localhost:8082/api/entregador", entregadorRequest)
                .then((response) => { notifySuccess('Entregador cadastrado com sucesso') })
                .catch((error) => { if (error.response) {
                    notifyError(error.response.data.message)
                    } else {
                    notifyError(mensagemErro)
                    }})
        }
    }


    return (

        <div>
            <MenuSistema tela={'entregador'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {idEntregador === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idEntregador !== undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }


                    <Divider />

                    <div style={{ marginTop: '4%' }}>

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
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label='RG'>
                                    <InputMask
                                        mask="99.999.999-9"
                                        value={rg}
                                        onChange={e => setRG(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    label='DT Nascimento'
                                    width={6}>

                                    <InputMask
                                        mask="99/99/9999"
                                        placeholder="Ex:20/03/1985"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'
                                    width={3}
                                >
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Fixo'
                                    width={3}
                                >
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Entregas Realizadas'
                                    width={2}
                                    value={qtdEntregasRealizadas}
                                    onChange={e => setQtdEntregasRealizadas(e.target.value)}

                                >
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Por Frete'
                                    width={2}
                                    value={valorFrete}
                                    onChange={e => setValorFrete(e.target.value)}
                                >
                                </Form.Input>

                            </Form.Group >

                            <Form.Group>
                                <Form.Input
                                    required
                                    fluid
                                    label='Rua'
                                    width={12}
                                    value={enderecoRua}
                                    onChange={e => setEnderecoRua(e.target.value)}
                                >
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label='Número'
                                    width={5}
                                    value={enderecoNumero}
                                    onChange={e => setEnderecoNumero(e.target.value)}
                                >
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    required
                                    fluid
                                    label='Bairro'
                                    width={12}
                                    value={enderecoBairro}
                                    onChange={e => setEnderecoBairro(e.target.value)}
                                >
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label='Cidade'
                                    width={5}
                                    value={enderecoCidade}
                                    onChange={e => setEnderecoCidade(e.target.value)}
                                >
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label='Cep'
                                    width={5}
                                >
                                    <InputMask
                                        mask="999999-99"
                                        value={enderecoCep}
                                        onChange={e => setEnderecoCep(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <FormSelect
                                    fluid
                                    label='UF'
                                    options={ufList}
                                    placeholder='Selecione'
                                    value={enderecoUf}
                                    onChange={(e, { value }) => {
                                        setEnderecoUf(value)
                                    }}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    required
                                    fluid
                                    label='complemento'
                                    width={16}
                                    value={enderecoCompleto}
                                    onChange={e => setEnderecoCompleto(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group inline>

                                <label>Ativo: </label>

                                <Form.Radio
                                    label='Sim'
                                    checked={ativo}
                                    onChange={e => setAtivo(true)}
                                />

                                <Form.Radio
                                    label='Não'
                                    checked={!ativo}
                                    onChange={e => setAtivo(false)}
                                />

                            </Form.Group>
                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Link to={'/list-entregador'} >       
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