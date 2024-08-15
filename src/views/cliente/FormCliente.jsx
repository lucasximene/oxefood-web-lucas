import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Button, Container, Divider, Form, FormGroup, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { Link, useLocation } from "react-router-dom";
import {mensagemErro, notifyError, notifySuccess } from '../../views/util/Util';


export default function FormCliente() {
  const { state } = useLocation();
  const [idCliente, setIdCliente] = useState();

  const [endereco, setEndereco] = useState([]);
  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [dataNascimento, setDataNascimento] = useState();
  const [foneCelular, setFoneCelular] = useState();
  const [foneFixo, setFoneFixo] = useState();
  const [primeiroClique, setPrimeiroClique] = useState(true);

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8082/api/cliente/" + state.id)
        .then((response) => {
          setIdCliente(response.data.id);
          setNome(response.data.nome);
          setCpf(response.data.cpf);
          setDataNascimento(formatarData(response.data.dataNascimento));
          setFoneCelular(response.data.foneCelular);
          setFoneFixo(response.data.foneFixo);
          setEndereco(response.data.enderecos || []);
        });
    }
  }, [state]);

  function formatarData(dataParam) {
    if (dataParam === null || dataParam === "" || dataParam === undefined) {
      return "";
    }

    let arrayData = dataParam.split("-");
    return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
  }

  function salvar() {
    let clienteRequest = {
      nome: nome,
      cpf: cpf,
      dataNascimento: dataNascimento,
      foneCelular: foneCelular,
      foneFixo: foneFixo,
    };

    if (idCliente != null) {
      //Alteração:
      axios
        .put("http://localhost:8082/api/cliente/" + idCliente, clienteRequest)
        .then((response) => {
          notifySuccess("Cliente alterado com sucesso.");
          resetForm();
        })
        .catch((error) => {
          if (error.response) {
            notifyError(error.response.data.message)
            } else {
            notifyError(mensagemErro)
            } 
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8082/api/cliente", clienteRequest)
        .then((response) => {
          let clienteID = response.data.id;
          enviarEnderecos(clienteID);
          notifySuccess('Cliente cadastrado com sucesso.')
          resetForm();
        })
        .catch((error) => {
          if (error.response) {
            notifyError(error.response.data.message)
            } else {
            notifyError(mensagemErro)
            } 
            
        });
    }
  }
  function resetForm() {
    setIdCliente(undefined);
    setNome('');
    setCpf('');
    setDataNascimento('');
    setFoneCelular('');
    setFoneFixo('');
    setEndereco([]);
    setPrimeiroClique(true);
  }

  function enviarEnderecos(clienteID) {
    endereco.forEach(async (endereco) => {
      await axios
        .post(
          "http://localhost:8082/api/cliente/endereco/" + clienteID,
          endereco
        )
        .then(() => console.log("Endereço cadastrado com sucesso."))
        .catch((error) => console.log("Erro ao cadastrar endereço.", error));
    });
  }

  function adicionarEndereco() {
    setEndereco([
      ...endereco,
      {
        rua: "",
        numero: "",
        cep: "",
        bairro: "",
        cidade: "",
        estado: "",
        complemento: "",
      },
    ]);
    setPrimeiroClique(false);
  }

  function atualizarEndereco(index, campo, valor) {
    const novosEnderecos = [...endereco];
    novosEnderecos[index][campo] = valor;
    setEndereco(novosEnderecos);
  }

  return (
    <div>
      <MenuSistema tela={"cliente"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idCliente === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Cliente &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}

          {idCliente !== undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Cliente &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Nome"
                  maxLength="100"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <Form.Input required fluid label="CPF">
                  <InputMask
                    required
                    mask="999.999.999-99"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="Fone Celular" width={6}>
                  <InputMask
                    mask="(99) 9999.9999"
                    value={foneCelular}
                    onChange={(e) => setFoneCelular(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="Fone Fixo" width={6}>
                  <InputMask
                    mask="(99) 9999.9999"
                    value={foneFixo}
                    onChange={(e) => setFoneFixo(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="Data Nascimento" width={6}>
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>
            </Form>

            {endereco.map((address, index) => (
              <div key={index} style={{ marginBottom: "2%" }}>
                <Divider />
                <Form>
                  <FormGroup>
                    <Form.Input
                      required
                      fluid
                      label="Rua"
                      width={8}
                      value={address.rua}
                      onChange={(e) =>
                        atualizarEndereco(index, "rua", e.target.value)
                      }
                    />
                    <Form.Input
                      required
                      fluid
                      label="Numero"
                      width={6}
                      value={address.numero}
                      onChange={(e) =>
                        atualizarEndereco(index, "numero", e.target.value)
                      }
                    />
                    <Form.Input fluid label="CEP" width={6}>
                      <InputMask
                        mask="99999-999"
                        value={address.cep}
                        onChange={(e) =>
                          atualizarEndereco(index, "cep", e.target.value)
                        }
                      />
                    </Form.Input>
                  </FormGroup>
                  <FormGroup>
                    <Form.Input
                      required
                      fluid
                      label="Bairro"
                      width={6}
                      value={address.bairro}
                      onChange={(e) =>
                        atualizarEndereco(index, "bairro", e.target.value)
                      }
                    />
                    <Form.Input
                      required
                      fluid
                      label="Cidade"
                      width={6}
                      value={address.cidade}
                      onChange={(e) =>
                        atualizarEndereco(index, "cidade", e.target.value)
                      }
                    />
                    <Form.Input
                      required
                      fluid
                      label="Estado"
                      width={6}
                      value={address.estado}
                      onChange={(e) =>
                        atualizarEndereco(index, "estado", e.target.value)
                      }
                    />
                  </FormGroup>
                  <Form.Input
                    required
                    fluid
                    label="Complemento"
                    value={address.complemento}
                    onChange={(e) =>
                      atualizarEndereco(index, "complemento", e.target.value)
                    }
                  />
                </Form>
              </div>
            ))}
            <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
            </Button>

            <Button
              type="button"
              inverted
              circular
              icon
              labelPosition="left"
              color="green"
              floated="right"
              onClick={adicionarEndereco}
            >
              <Icon name="plus" />
              {primeiroClique ? "Adicionar Endereço" : "Adicionar um Novo Endereço"}
            </Button>

            <div style={{ marginTop: "6%" }}>
              <Link to={"/list-cliente"}>
                <Button
                  type="button"
                  inverted
                  circular
                  icon
                  labelPosition="left"
                  color="orange"
                >
                  <Icon name="reply" />
                  <Link to={"/list-cliente"}>Voltar</Link>
                </Button>
              </Link>

            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}