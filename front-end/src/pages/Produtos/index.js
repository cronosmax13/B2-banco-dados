import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  ConteudoTitulo,
  BotaoAcao,
  ButtonSuccess,
  ButtonPrimary,
  ButtonDanger,
  Table,
  AlertSuccess,
  AlertDanger,
  Titulo,
  BotaoCadastrar,
  BotaoSair,
  BotaoVoltar,
} from "./styles";

export const Produtos = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("@Authuser");
    history.push("/login");
  };

  const getProdutos = async () => {
    try {
      const response = await fetch("http://localhost:8000/produtos");
      const responseJson = await response.json();
      setData(responseJson.produtos);
    } catch (err) {
      setStatus({
        type: "erro",
        mensagem: "Erro ao carregar produtos: " + err.message,
      });
    }
  };

  const apagarProduto = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/produtos?id=${id}`, {
        method: "DELETE",
      });
      const responseJson = await response.json();

      if (responseJson.erro) {
        setStatus({
          type: "erro",
          mensagem: responseJson.mensagem,
        });
      } else {
        setStatus({
          type: "success",
          mensagem: responseJson.mensagem,
        });
        getProdutos(); // Atualiza a lista após deletar
      }
    } catch (err) {
      setStatus({
        type: "erro",
        mensagem: "Erro ao apagar produto: " + err.message,
      });
    }
  };

  useEffect(() => {
    getProdutos();
  }, []);

  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Listar Produtos</Titulo>
        <div>
          <BotaoCadastrar onClick={() => history.push("/cadastrar")}>
            Cadastrar
          </BotaoCadastrar>
          <BotaoVoltar onClick={() => history.push("/menu")}>
            Voltar ao menu
          </BotaoVoltar>
        </div>
      </ConteudoTitulo>

      {status.type === "erro" && <AlertDanger>{status.mensagem}</AlertDanger>}
      {status.type === "success" && (
        <AlertSuccess>{status.mensagem}</AlertSuccess>
      )}

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.titulo}</td>
              <td>{produto.descricao}</td>
              <td>R$ {Number(produto.valor).toFixed(2)}</td>
              <td>{produto.quantidade}</td>
              <td>
                <ButtonPrimary
                  onClick={() => history.push(`/visualizar/${produto.id}`)}
                >
                  Visualizar
                </ButtonPrimary>{" "}
                <ButtonSuccess
                  onClick={() => history.push(`/editar/${produto.id}`)}
                >
                  Editar
                </ButtonSuccess>{" "}
                <ButtonDanger onClick={() => apagarProduto(produto.id)}>
                  Deletar
                </ButtonDanger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Produtos;
