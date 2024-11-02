import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
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
  Titulo,
} from "./styles";

export const Editar = () => {
  const history = useHistory();
  const { id } = useParams();

  const [produto, setProduto] = useState({
    titulo: "",
    descricao: "",
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const getProduto = async () => {
    try {
      const response = await fetch(`http://localhost:8000/produtos/${id}`);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data.erro) {
        throw new Error(data.mensagem);
      }

      setProduto(data.produto);
    } catch (err) {
      setStatus({
        type: "erro",
        mensagem: "Erro ao carregar o produto: " + err.message,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!produto.titulo || !produto.descricao) {
        setStatus({
          type: "erro",
          mensagem: "Preencha todos os campos!",
        });
        return;
      }

      const response = await fetch(`http://localhost:8000/produtos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          titulo: produto.titulo,
          descricao: produto.descricao,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensagem || `Erro HTTP: ${response.status}`);
      }

      if (data.erro) {
        throw new Error(data.mensagem);
      }

      setStatus({
        type: "success",
        mensagem: "Produto atualizado com sucesso!",
      });

      setTimeout(() => {
        history.push("/");
      }, 2000);
    } catch (err) {
      setStatus({
        type: "erro",
        mensagem: "Erro ao atualizar o produto: " + err.message,
      });
    }
  };

  useEffect(() => {
    getProduto();
  }, [id]);

  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Editar Produto</Titulo>
        <BotaoAcao onClick={() => history.goBack()}>Voltar</BotaoAcao>
      </ConteudoTitulo>

      {status.type === "erro" ? (
        <AlertDanger>{status.mensagem}</AlertDanger>
      ) : status.type === "success" ? (
        <AlertSuccess>{status.mensagem}</AlertSuccess>
      ) : (
        ""
      )}

      <ConteudoForm>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label>Título</Label>
            <Input
              type="text"
              name="titulo"
              placeholder="Título do produto"
              value={produto.titulo}
              onChange={(e) =>
                setProduto({ ...produto, titulo: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Descrição</Label>
            <Input
              type="text"
              name="descricao"
              placeholder="Descrição do produto"
              value={produto.descricao}
              onChange={(e) =>
                setProduto({ ...produto, descricao: e.target.value })
              }
            />
          </div>

          <div className="button-container">
            <BotaoAcao type="submit">Salvar</BotaoAcao>
          </div>
        </Form>
      </ConteudoForm>
    </Container>
  );
};
