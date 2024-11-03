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
  FormGroup,
  Select,
  ButtonContainer,
} from "./styles";

const EditarPerfil = () => {
  const history = useHistory();
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    nivel_acesso: "",
    senha: "",
    confirmar_senha: "",
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("@Authuser");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const user = Array.isArray(userData) ? userData[0] : userData;
      setUsuario({
        nome: user.nome || "",
        email: user.email || "",
        nivel_acesso: user.nivel_acesso || "",
        senha: "",
        confirmar_senha: "",
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usuario.senha && usuario.senha !== usuario.confirmar_senha) {
      setStatus({
        type: "erro",
        mensagem: "As senhas não conferem!",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/usuarios/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: usuario.email,
          nome: usuario.nome,
          nivel_acesso: usuario.nivel_acesso,
          senha: usuario.senha || undefined,
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
          mensagem: "Perfil atualizado com sucesso!",
        });

        const storedUser = JSON.parse(localStorage.getItem("@Authuser"));
        if (storedUser) {
          const updatedUser = {
            ...storedUser[0],
            nome: usuario.nome,
            nivel_acesso: usuario.nivel_acesso,
          };
          localStorage.setItem("@Authuser", JSON.stringify([updatedUser]));
        }

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
            <Input type="email" value={usuario.email} disabled />
          </div>
          <FormGroup>
            <Label>Nível de Acesso</Label>
            <Select
              value={usuario.nivel_acesso}
              onChange={(e) =>
                setUsuario({ ...usuario, nivel_acesso: e.target.value })
              }
            >
              <option value="">Selecione...</option>
              <option value="admin">Administrador</option>
              <option value="usuario">Usuário</option>
            </Select>
          </FormGroup>
          <div>
            <Label>Nova Senha</Label>
            <Input
              type="password"
              value={usuario.senha}
              onChange={(e) =>
                setUsuario({ ...usuario, senha: e.target.value })
              }
              placeholder="Deixe em branco para manter a senha atual"
            />
          </div>
          <div>
            <Label>Confirmar Nova Senha</Label>
            <Input
              type="password"
              value={usuario.confirmar_senha}
              onChange={(e) =>
                setUsuario({ ...usuario, confirmar_senha: e.target.value })
              }
              placeholder="Confirme a nova senha"
            />
          </div>
          <ButtonContainer>
            <BotaoAcao type="submit">Atualizar</BotaoAcao>
            <BotaoAcao
              className="outline"
              onClick={() => history.push("/menu")}
            >
              Voltar ao Menu
            </BotaoAcao>
          </ButtonContainer>
        </Form>
      </ConteudoForm>
    </Container>
  );
};

export { EditarPerfil };
