// Importação das dependências necessárias
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
    e.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      // Tenta realizar o login com as credenciais fornecidas
      await signIn(credentials.email, credentials.senha);
      // Redireciona para a página inicial em caso de sucesso
      history.push("/");
    } catch (error) {
      // Em caso de erro, atualiza o estado com a mensagem de erro
      setStatus({
        type: "erro",
        mensagem: error.message,
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
        </Form>
      </ConteudoForm>
    </Container>
  );
};
