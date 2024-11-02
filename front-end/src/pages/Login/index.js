// Importação das dependências necessárias
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// Importação dos componentes estilizados
import {
  Container,
  ConteudoForm,
  Form,
  Label,
  Input,
  ButtonSuccess,
  AlertSuccess,
  AlertDanger,
  LinkContainer,
} from "./styles";

export const Login = () => {
  // Hook para navegação entre páginas
  const history = useHistory();
  // Hook personalizado para autenticação
  const { signIn } = useAuth();

  // Estado para armazenar as credenciais do usuário
  const [credentials, setCredentials] = useState({
    email: "",
    senha: "",
  });

  // Estado para controlar mensagens de status/erro
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  // Função que atualiza o estado das credenciais conforme o usuário digita
  const valorInput = (e) =>
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });

  // Função que gerencia o processo de login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signIn(credentials.email, credentials.senha);
      history.push("/");
    } catch (err) {
      setStatus({
        type: "erro",
        mensagem: err.message,
      });
    }
  };

  // Renderização do componente
  return (
    <Container>
      <ConteudoForm>
        <h1>Login</h1>

        {/* Exibe mensagem de erro se houver */}
        {status.type === "erro" && <AlertDanger>{status.mensagem}</AlertDanger>}

        {/* Formulário de login */}
        <Form onSubmit={handleLogin}>
          <Label>Email: </Label>
          <Input
            type="email"
            name="email"
            placeholder="Digite seu email"
            onChange={valorInput}
          />

          <Label>Senha: </Label>
          <Input
            type="password"
            name="senha"
            placeholder="Digite sua senha"
            onChange={valorInput}
          />

          <ButtonSuccess type="submit">Acessar</ButtonSuccess>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
              padding: "10px 0",
              borderTop: "1px solid #eee",
            }}
          >
            <Link
              to="/cadastrar-usuario"
              style={{ color: "#198754", textDecoration: "none" }}
            >
              Criar Usuário
            </Link>
            <Link
              to="/alterar-senha"
              style={{ color: "#198754", textDecoration: "none" }}
            >
              Alterar Senha
            </Link>
          </div>
        </Form>
      </ConteudoForm>
    </Container>
  );
};
