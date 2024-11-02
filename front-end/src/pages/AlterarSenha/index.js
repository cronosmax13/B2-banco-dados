import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  ConteudoForm,
  Form,
  Label,
  Input,
  BotaoAcao,
  AlertSuccess,
  AlertDanger,
  Titulo,
  ConteudoTitulo,
} from "./styles";

export const AlterarSenha = () => {
  const history = useHistory();
  const [dados, setDados] = useState({
    email: "",
    senha_atual: "",
    nova_senha: "",
    confirmar_senha: "",
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !dados.email ||
      !dados.senha_atual ||
      !dados.nova_senha ||
      !dados.confirmar_senha
    ) {
      setStatus({
        type: "erro",
        mensagem: "Preencha todos os campos!",
      });
      return;
    }

    if (dados.nova_senha !== dados.confirmar_senha) {
      setStatus({
        type: "erro",
        mensagem: "As senhas não conferem!",
      });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/controllers/alterar_senha.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: dados.email,
            senha_atual: dados.senha_atual,
            nova_senha: dados.nova_senha,
          }),
        }
      );

      // ... resto do código ...
    } catch (err) {
      setStatus({
        type: "erro",
        mensagem: err.message,
      });
    }
  };

  // ... resto do código ...

  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Alterar Senha</Titulo>
      </ConteudoTitulo>
      <ConteudoForm>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={dados.email}
              onChange={(e) => setDados({ ...dados, email: e.target.value })}
            />
          </div>
          <div>
            <Label>Senha Atual</Label>
            <Input
              type="password"
              value={dados.senha_atual}
              onChange={(e) =>
                setDados({ ...dados, senha_atual: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Nova Senha</Label>
            <Input
              type="password"
              value={dados.nova_senha}
              onChange={(e) =>
                setDados({ ...dados, nova_senha: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Confirmar Senha</Label>
            <Input
              type="password"
              value={dados.confirmar_senha}
              onChange={(e) =>
                setDados({ ...dados, confirmar_senha: e.target.value })
              }
            />
          </div>
          <div className="button-container">
            <BotaoAcao type="submit">Alterar Senha</BotaoAcao>
          </div>
        </Form>
      </ConteudoForm>
    </Container>
  );
};
