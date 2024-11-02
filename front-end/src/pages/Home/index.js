import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import {
  Container,
  ConteudoTitulo,
  BotaoAcao,
  ButtonSuccess,
  Table,
  Titulo,
  ButtonPrimary,
  ButtonWarning,
  ButtonDanger,
  AlertSuccess,
  AlertDanger,
  HeaderContent,
} from "./styles";

export const Home = () => {
  const history = useHistory();
  const { signOut } = useAuth();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const getProdutos = async () => {
    try {
      const response = await fetch("http://localhost:8000/produtos");
      const responseJson = await response.json();
      setData(responseJson.records);
    } catch (err) {
      setStatus({
        type: "erro",
        mensagem: "Erro ao carregar produtos: " + err.message,
      });
    }
  };

  const apagarProduto = async (id) => {
    try {
      if (!window.confirm("Deseja realmente apagar este produto?")) {
        return;
      }

      const response = await fetch(`http://localhost:8000/produtos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const responseJson = await response.json();

      if (responseJson.erro) {
        throw new Error(responseJson.mensagem);
      }

      setStatus({
        type: "success",
        mensagem: responseJson.mensagem,
      });

      getProdutos(); // Atualiza a lista
    } catch (err) {
      setStatus({
        type: "erro",
        mensagem: "Erro ao apagar produto: " + err.message,
      });
    }
  };

  const handleLogout = () => {
    try {
      signOut();
      history.push("/login");
    } catch (error) {
      setStatus({
        type: "erro",
        mensagem: "Erro ao fazer logout: " + error.message,
      });
    }
  };

  useEffect(() => {
    getProdutos();
  }, []);

  return (
    <Container>
      <HeaderContent>
        <ConteudoTitulo>
          <Titulo>Listar Produtos</Titulo>
          <div className="button-group">
            <Link to="/cadastrar">
              <BotaoAcao>Cadastrar</BotaoAcao>
            </Link>
            <ButtonDanger onClick={handleLogout}>Sair</ButtonDanger>
          </div>
        </ConteudoTitulo>
      </HeaderContent>

      {status.type === "erro" ? (
        <AlertDanger>{status.mensagem}</AlertDanger>
      ) : (
        ""
      )}
      {status.type === "success" ? (
        <AlertSuccess>{status.mensagem}</AlertSuccess>
      ) : (
        ""
      )}

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.titulo}</td>
              <td>{item.descricao}</td>
              <td>
                <Link
                  to={`/visualizar/${item.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Visualizar
                </Link>{" "}
                <Link
                  to={`/editar/${item.id}`}
                  className="btn btn-warning btn-sm"
                >
                  Editar
                </Link>{" "}
                <button
                  onClick={() => apagarProduto(item.id)}
                  className="btn btn-danger btn-sm"
                >
                  Apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
