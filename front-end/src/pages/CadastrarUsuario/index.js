import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  ConteudoForm,
  ConteudoTitulo,
  BotaoAcao,
  AlertSuccess,
  AlertDanger,
  Form,
  Label,
  Input,
  ButtonSuccess,
} from "./styles";

const CadastrarUsuario = () => {
  const history = useHistory();

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usuario.senha !== usuario.confirmarSenha) {
      setStatus({
        type: "erro",
        mensagem: "As senhas não conferem!",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: usuario.nome,
          email: usuario.email,
          senha: usuario.senha,
        }),
      });

      const data = await response.json();

      if (data.erro) {
        setStatus({
          type: "erro",
          mensagem: data.mensagem,
        });
      } else {
        setStatus({
          type: "success",
          mensagem: "Usuário cadastrado com sucesso!",
        });
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      }
    } catch (err) {
      setStatus({
        type: "erro",
        mensagem: "Erro ao cadastrar usuário: " + err.message,
      });
    }
  };

  return (
    <Container>
      <ConteudoForm>
        <ConteudoTitulo>
          <h1>Cadastrar Usuário</h1>
          <BotaoAcao onClick={() => history.push("/login")}>Voltar</BotaoAcao>
        </ConteudoTitulo>

        {status.type === "success" && (
          <AlertSuccess>{status.mensagem}</AlertSuccess>
        )}
        {status.type === "erro" && <AlertDanger>{status.mensagem}</AlertDanger>}

        <Form onSubmit={handleSubmit}>
          <Label>Nome:</Label>
          <Input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={usuario.nome}
            onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
          />
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={usuario.email}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
          />
          <Label>Senha:</Label>
          <Input
            type="password"
            name="senha"
            placeholder="Senha"
            value={usuario.senha}
            onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
          />
          <Label>Confirmar Senha:</Label>
          <Input
            type="password"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            value={usuario.confirmarSenha}
            onChange={(e) =>
              setUsuario({ ...usuario, confirmarSenha: e.target.value })
            }
          />
          <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>
        </Form>
      </ConteudoForm>
    </Container>
  );
};

export default CadastrarUsuario;
