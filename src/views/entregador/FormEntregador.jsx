import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

const estadosOptions = [
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

export default function FormEntregador () {

    const { state } = useLocation();
    const [idEntregador, setIdEntregador] = useState();

    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qtdEntregas, setQtdEntregas] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [rua, setRua] = useState();
    const [numero, setNumero] = useState();
    const [bairro, setBairro] = useState();
    const [cidade, setCidade] = useState();
    const [cep, setCep] = useState();
    const [uf, setUf] = useState();
    const [complemento, setComplemento] = useState();
    const [ativo, setAtivo] = useState(true);

    useEffect(() => {

        if (state != null && state.id != null) {

            axios.get("http://localhost:8082/api/entregador/" + state.id)
            .then((response) => {
                setIdEntregador(response.data.id)
                setNome(response.data.nome)
                setCpf(response.data.cpf)
                setRg(response.data.rg)
                setDataNascimento(formatarData(response.data.dataNascimento))
                setFoneCelular(response.data.foneCelular)
                setFoneFixo(response.data.foneFixo)
                setQtdEntregas(response.data.qtdEntregas)
                setValorFrete(response.data.valorFrete)
                setRua(response.data.rua)
                setNumero(response.data.numero)
                setBairro(response.data.bairro)
                setCidade(response.data.cidade)
                setCep(response.data.cep)
                setUf(response.data.uf)
                setComplemento(response.data.complemento)
                setAtivo(response.data.ativo)

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

		let entregadorRequest = {
		     nome: nome,
		     cpf: cpf,
             rg: rg,
		     dataNascimento: dataNascimento,
		     foneCelular: foneCelular,
		     foneFixo: foneFixo,
             qtdEntregas: qtdEntregas,
             valorFrete: valorFrete,
             rua: rua,
             numero: numero,
             bairro: bairro,
             cidade: cidade,
             cep: cep,
             uf: uf,
             complemento: complemento,
             ativo: ativo
		}
	
        if (idEntregador != null) { //Alteração:

            axios.put("http://localhost:8082/api/entregador/" + idEntregador, entregadorRequest)
            .then((response) => { 
                console.log('Entregador alterado com sucesso.') })
            .catch((error) => { 
                console.log('Erro ao alter um entregador.') })
        
        } else { //Cadastro:

            axios.post("http://localhost:8082/api/entregador", entregadorRequest)
            .then((response) => { 
                console.log('Entregador cadastrado com sucesso.') })
            .catch((error) => { 
                console.log('Erro ao incluir o entregador.') })
        }

	}

    return (

        <div>
            <MenuSistema tela={'Entregador'} />
            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    { idEntregador === undefined &&
                        <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    { idEntregador != undefined &&
                        <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    width={16}
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Input
                                    width={10}
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
                                    width={10}
                                    label='RG'
                                    maxLength="100"
                                    value={rg}
                                    onChange={e => setRg(e.target.value)}
                                />

                            </Form.Group>
                            
                            <Form.Group>
                                <Form.Input
                                    width={3}
                                    fluid
                                    label='DT Nascimento'>
                                    <InputMask 
                                        mask="99/99/9999" 
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    width={4}
                                    required
                                    fluid
                                    label='Fone Celular'>
                                    <InputMask 
                                        mask="(99) 9999.9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    width={4}
                                    fluid
                                    label='Fone Fixo'>
                                    <InputMask 
                                        mask="(99) 9999.9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    width={3}
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    maxLength="100"
                                    value={qtdEntregas}
                                    onChange={e => setQtdEntregas(e.target.value)}
                                >
                                </Form.Input>

                                <Form.Input
                                    width={3}
                                    fluid
                                    label='Valor Por Frete'
                                    maxLength="100"
                                    value={valorFrete}
                                    onChange={e => setValorFrete(e.target.value)}
                                >
                                </Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                width={14}
                                fluid
                                label='Rua'
                                maxLength="100"
                                value={rua}
                                onChange={e => setRua(e.target.value)}
                                >
                                </Form.Input>
                                <Form.Input
                                width={3}
                                fluid
                                label='Número'
                                maxLength="100"
                                value={numero}
                                onChange={e => setNumero(e.target.value)}
                                >
                                </Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                width={14}
                                fluid
                                label='Bairro'
                                maxLength="100"
                                value={bairro}
                                onChange={e => setBairro(e.target.value)}
                                >
                                </Form.Input>
                                <Form.Input
                                width={6}
                                fluid
                                label='Cidade'
                                maxLength="100"
                                value={cidade}
                                onChange={e => setCidade(e.target.value)}
                                >
                                </Form.Input>
                                <Form.Input
                                width={3}
                                fluid
                                label='CEP'
                                maxLength="100">
                                    <InputMask 
                                        mask="999999-999"
                                        value={cep}
                                        onChange={e => setCep(e.target.value)}
                                    /> 

                                </Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.Select
                                width={16}
                                label='UF'
                                Select placeholder='Selecione' options={estadosOptions}
                                value={uf}
                                onChange={(e, {value}) => {
                                    setUf(value)
                                }}
                                >
                                </Form.Select>

                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                width={16}
                                label='Complemento'
                                maxLength="100"
                                value={complemento}
                                onChange={e => setComplemento(e.target.value)}
                                >
                                </Form.Input>

                            </Form.Group>

                            <Form.Group inline>
                            
                            <label>Ativo: </label>

                            <Form.Radio
                            label='Sim'
                            checked={ativo}
                            onChange={e => setAtivo(true)}>
                            </Form.Radio>

                            <Form.Radio
                            label='Não'
                            checked={!ativo}
                            onChange={e => setAtivo(false)}>
                            </Form.Radio>
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
                                <Link to={'/list-entregador'}>Voltar</Link>
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
