import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  ConteudoTitulo,
  Titulo,
  ConteudoForm,
  Form,
  Label,
  Input,
  BotaoAcao,
  AlertSuccess,
  AlertDanger,
} from "./styles";

const EditarPerfil = () => {
  const history = useHistory();
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/usuarios/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
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
          mensagem: "Perfil atualizado com sucesso!",
        });
        setTimeout(() => {
          history.push("/menu");
        }, 2000);
      }
    } catch (err) {
      setStatus({
        type: "erro",
        mensagem: "Erro ao atualizar perfil: " + err.message,
      });
    }
  };

  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Editar Perfil</Titulo>
        <BotaoAcao onClick={() => history.push("/menu")}>Voltar</BotaoAcao>
      </ConteudoTitulo>

      {status.type === "erro" && <AlertDanger>{status.mensagem}</AlertDanger>}
      {status.type === "success" && (
        <AlertSuccess>{status.mensagem}</AlertSuccess>
      )}

      <ConteudoForm>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label>Nome</Label>
            <Input
              type="text"
              value={usuario.nome}
              onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={usuario.email}
              onChange={(e) =>
                setUsuario({ ...usuario, email: e.target.value })
              }
              disabled
            />
          </div>
          <div className="button-container">
            <BotaoAcao type="submit">Atualizar</BotaoAcao>
          </div>
        </Form>
      </ConteudoForm>
    </Container>
  );
};

export { EditarPerfil };
