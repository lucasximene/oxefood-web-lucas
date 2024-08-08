import axios from "axios"
import React, { useEffect, useState } from "react"
import InputMask from "react-input-mask"
import { Link, useLocation } from "react-router-dom"
import {
  Button,
  Container,
  Divider,
  Form,
  FormTextArea,
  Icon,
} from "semantic-ui-react"
import MenuSistema from "../../MenuSistema"
import {mensagemErro, notifyError, notifySuccess } from '../../views/util/Util';

export default function FormProduto() {
  const { state } = useLocation()
  const [idProduto, setIdProduto] = useState()

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/produto/" + state.id)
        .then((response) => {
          setIdProduto(response.data.id)
          setCodigo(response.data.codigo)
          setTitulo(response.data.titulo)
          setDescricao(response.data.descricao)
          setValorUnitario(response.data.valorUnitario)
          setTempoEntregaMinimo(response.data.tempoEntregaMinimo)
          setTempoEntregaMaximo(response.data.tempoEntregaMaximo)
          setIdCategoria(response.data.categoria.id)
        })
    }
    axios.get("http://localhost:8080/api/categoriaproduto")
       .then((response) => {
           const dropDownCategorias = response.data.map(c => ({ text: c.descricao, value: c.id }));
           setListaCategoria(dropDownCategorias);
       })

  }, [state])

  const [codigo, setCodigo] = useState()
  const [titulo, setTitulo] = useState()
  const [descricao, setDescricao] = useState()
  const [valorUnitario, setValorUnitario] = useState()
  const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState()
  const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState()
  const [listaCategoria, setListaCategoria] = useState([])
  const [idCategoria, setIdCategoria] = useState()

  function salvar() {
    let produtoRequest = {
      idCategoria: idCategoria,  
      codigo: codigo,
      titulo: titulo,
      descricao: descricao,
      valorUnitario: valorUnitario,
      tempoEntregaMinimo: tempoEntregaMinimo,
      tempoEntregaMaximo: tempoEntregaMaximo,
    }
    if (idProduto != null) {
      //Alteração:
      axios
        .put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
        .then((response) => {
          notifySuccess("Produto alterado com sucesso.")
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
        .post("http://localhost:8080/api/produto", produtoRequest)
        .then((response) => {
          notifySuccess("Produto cadastrado com sucesso.")
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
      <MenuSistema tela={"produto"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign='justified'>
          {idProduto === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Produto &nbsp;
                <Icon
                  name='angle double right'
                  size='small'
                />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idProduto !== undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Produto &nbsp;
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
                  label='Título'
                  maxLength='100'
                >
                  <InputMask
                    placeholder='Informe o título do produto'
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                  required
                  fluid
                  label='Código do Produto'
                  width={6}
                >
                  <InputMask
                    placeholder='Informe o código do produto'
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
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
                  setIdCategoria(value)
                }}
              />

              <Form.Group>
                <FormTextArea
                  required
                  label='Descrição'
                  placeholder='Informe a descrição do produto'
                  width={16}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  required
                  fluid
                  label='Valor Unitário'
                  width={6}
                  value={valorUnitario}
                  onChange={(e) => setValorUnitario(e.target.value)}
                ></Form.Input>

                <Form.Input
                  required
                  fluid
                  label='Tempo de Entrega Mínimo em Minutos'
                  width={6}
                >
                  <InputMask
                    placeholder='30'
                    value={tempoEntregaMinimo}
                    onChange={(e) => setTempoEntregaMinimo(e.target.value)}
                  />
                </Form.Input>
                <Form.Input
                  required
                  fluid
                  label='Tempo de Entrega Máximo em Minutos'
                  width={6}
                >
                  <InputMask
                    placeholder='40'
                    value={tempoEntregaMaximo}
                    onChange={(e) => setTempoEntregaMaximo(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to={"/list-produto"}>
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