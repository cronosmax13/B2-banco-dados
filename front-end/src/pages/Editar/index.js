import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Container,
  ConteudoTitulo,
  BotaoAcao,
  Titulo,
  ConteudoForm,
  Form,
  Label,
  Input,
  AlertSuccess,
  AlertDanger,
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
      const response = await fetch(`http://localhost:8000/produtos?id=${id}`);
      const responseJson = await response.json();

      if (responseJson.erro) {
        setStatus({
          type: "erro",
          mensagem: responseJson.mensagem,
        });
      } else {
        setProduto(responseJson.produto);
      }
    } catch (err) {
      setStatus({
        type: "erro",
        mensagem: "Erro ao carregar produto: " + err.message,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/produtos?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
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
          mensagem: "Produto atualizado com sucesso!",
        });

        setTimeout(() => {
          history.push("/");
        }, 2000);
      }
    } catch (err) {
      setStatus({
        type: "erro",
        mensagem: "Erro ao atualizar produto: " + err.message,
      });
    }
  };

  useEffect(() => {
    if (!id) {
      setStatus({
        type: "erro",
        mensagem: "ID não fornecido",
      });
      return;
    }
    getProduto();
  }, [id]);

  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Editar Produto</Titulo>
        <BotaoAcao onClick={() => history.goBack()}>Voltar</BotaoAcao>
      </ConteudoTitulo>

      {status.type === "erro" && <AlertDanger>{status.mensagem}</AlertDanger>}
      {status.type === "success" && (
        <AlertSuccess>{status.mensagem}</AlertSuccess>
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
