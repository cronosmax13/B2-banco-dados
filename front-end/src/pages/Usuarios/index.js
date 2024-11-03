import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  ConteudoTitulo,
  Titulo,
  Table,
  AlertDanger,
  BotaoVoltar,
} from "../Produtos/styles";

export const Usuarios = () => {
  const history = useHistory();
  const [usuarios, setUsuarios] = useState([]);
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const [loading, setLoading] = useState(true);

  const getUsuarios = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/usuarios");
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      const data = await response.json();
      if (data.erro) {
        throw new Error(data.mensagem);
      }
      setUsuarios(data.usuarios || []);
    } catch (err) {
      setStatus({
        type: "erro",
        mensagem: "Erro ao carregar usuários: " + err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        await getUsuarios();
      } catch (error) {
        if (mounted) {
          setStatus({
            type: "erro",
            mensagem: "Erro ao carregar usuários: " + error.message,
          });
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Container>
        <ConteudoTitulo>
          <Titulo>Usuários do Sistema</Titulo>
          <BotaoVoltar onClick={() => history.push("/menu")}>
            Voltar ao Menu
          </BotaoVoltar>
        </ConteudoTitulo>
        <p>Carregando...</p>
      </Container>
    );
  }

  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Usuários do Sistema</Titulo>
        <BotaoVoltar onClick={() => history.push("/menu")}>
          Voltar ao Menu
        </BotaoVoltar>
      </ConteudoTitulo>

      {status.type === "erro" && <AlertDanger>{status.mensagem}</AlertDanger>}

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Nível de Acesso</th>
            <th>Data de Cadastro</th>
          </tr>
        </thead>
        <tbody>
          {usuarios && usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{usuario.nivel_acesso}</td>
                <td>{new Date(usuario.created_at).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Nenhum usuário encontrado
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};
