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
  Titulo,
} from "./styles";

export const Cadastrar = () => {
  const history = useHistory();

  const [produto, setProduto] = useState({
    titulo: "",
    descricao: "",
    valor: "",
    quantidade: "",
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

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

      const response = await fetch("http://localhost:8000/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
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
        mensagem: "Produto cadastrado com sucesso!",
      });

      setTimeout(() => {
        history.push("/");
      }, 2000);
    } catch (err) {
      setStatus({
        type: "erro",
        mensagem: "Erro ao cadastrar produto: " + err.message,
      });
    }
  };

  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Cadastrar Produto</Titulo>
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
            <Label>Título: </Label>
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
            <Label>Descrição: </Label>
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
          <div>
            <Label>Valor: </Label>
            <Input
              type="number"
              step="0.01"
              name="valor"
              placeholder="Valor do produto"
              value={produto.valor}
              onChange={(e) =>
                setProduto({ ...produto, valor: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Quantidade: </Label>
            <Input
              type="number"
              name="quantidade"
              placeholder="Quantidade em estoque"
              value={produto.quantidade}
              onChange={(e) =>
                setProduto({ ...produto, quantidade: e.target.value })
              }
            />
          </div>
          <div className="button-container">
            <BotaoAcao type="submit">Cadastrar</BotaoAcao>
          </div>
        </Form>
      </ConteudoForm>
    </Container>
  );
};
