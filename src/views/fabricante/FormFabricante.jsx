import axios from "axios"
import React, { useState, useEffect } from "react"
import InputMask from "react-input-mask"
import { Link, useLocation } from "react-router-dom"
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react"
import MenuSistema from "../../MenuSistema"
import {mensagemErro, notifyError, notifySuccess } from '../../views/util/Util';

export default function FormFabricante() {
    const { state } = useLocation()
    const [idFabricante, setIdFabricante] = useState()
    const [nome, setNome] = useState()
    const [endereco, setEndereco] = useState()
    const [valorMercado, setValorMercado] = useState()
    const [paginaWeb, setPaginaWeb] = useState()
    const [qtdFuncionarios, setQtdFuncionarios] = useState()
    const [inicioContrato, setInicioContrato] = useState()
  
    useEffect(() => {
      if (state != null && state.id != null) {
        axios
          .get("http://localhost:8082/api/fabricante/" + state.id)
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
      if (dataParam === null || dataParam === "" || dataParam === undefined) {
        return ""
      }
  
      let arrayData = dataParam.split("-")
      return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0]
    }
  
    function salvar() {
      let fabricanteRequest = {
        nome: nome,
        endereco: endereco,
        valorMercado: valorMercado,
        paginaWeb: paginaWeb,
        qtdFuncionarios: qtdFuncionarios,
        inicioContrato: inicioContrato,
      }
  
      if (idFabricante != null) {
        //Alteração:
        axios
          .put("http://localhost:8082/api/fabricante/" + idFabricante, fabricanteRequest)
          .then((response) => {
            notifySuccess("Fabricante alterado com sucesso.")
          })
          .catch((error) => {
            if (error.response) {
              notifyError(error.response.data.message)
              } else {
              notifyError(mensagemErro)
              } 
          })
      } else {
        //Cadastro:
        axios
          .post("http://localhost:8082/api/fabricante", fabricanteRequest)
          .then((response) => {
            notifySuccess("Fabricante cadastrado com sucesso.")
          })
          .catch((error) => {
            if (error.response) {
              notifyError(error.response.data.message)
              } else {
              notifyError(mensagemErro)
              } 
          })
      }
    }
  
    return (
      <div>
        <MenuSistema tela={"fabricante"} />
  
        <div style={{ marginTop: "3%" }}>
          <Container textAlign='justified'>
            {idFabricante === undefined && (
              <h2>
                {" "}
                <span style={{ color: "darkgray" }}>
                  {" "}
                  Fabricante &nbsp;
                  <Icon
                    name='angle double right'
                    size='small'
                  />{" "}
                </span>{" "}
                Cadastro
              </h2>
            )}
            {idFabricante !== undefined && (
              <h2>
                {" "}
                <span style={{ color: "darkgray" }}>
                  {" "}
                  Fabricante &nbsp;
                  <Icon
                    name='angle double right'
                    size='small'
                  />{" "}
                </span>{" "}
                Alteração
              </h2>
            )}
  
            <Divider />
  
            <div style={{ marginTop: "4%" }}>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Input
                    required
                    fluid
                    label='Nome'
                    maxLength='100'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
  
                  <Form.Input
                    required
                    fluid
                    label='Endereço'
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                  />
    
                </Form.Group>
  
                <Form.Group>
                  <Form.Input
                    required
                    fluid
                    label='Valor Mercado'
                    width={6}
                    value={valorMercado}
                    onChange={(e) => setValorMercado(e.target.value)}
                  />
                    
                  <Form.Input
                    required
                    fluid
                    label='Pagina Web'
                    width={6}
                    value={paginaWeb}
                    onChange={(e) => setPaginaWeb(e.target.value)}
                  />
                    
                 
                  <Form.Input
                    required
                    fluid
                    label='Qtd Funcionarios'
                    width={6}
                    value={qtdFuncionarios}
                    onChange={(e) => setQtdFuncionarios(e.target.value)}
                  />
                  
                  <Form.Input
                    required
                    fluid
                    label='Inicio Contrato'
                    width={6}
                  >
                     <InputMask
                    mask='99/99/9999'
                    maskChar={null}
                    placeholder='Ex: 20/03/1985'
                    value={inicioContrato}
                    onChange={(e) => setInicioContrato(e.target.value)}
                  />
                  </Form.Input>
                </Form.Group>
              </Form>
  
              <div style={{ marginTop: "4%" }}>
  
                  <Link to={'/list-fabricante'} >
                <Button
                  type='button'
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
    )
  }
  