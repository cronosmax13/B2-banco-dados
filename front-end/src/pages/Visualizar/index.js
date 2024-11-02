import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Container,
  ConteudoTitulo,
  BotaoAcao,
  Titulo,
  ConteudoProduto,
} from "./styles";

export const Visualizar = () => {
  const { id } = useParams();
  const history = useHistory();

  const [data, setData] = useState({
    id: "",
    titulo: "",
    descricao: "",
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  useEffect(() => {
    const getProduto = async () => {
      try {
        const response = await fetch(`http://localhost:8000/produtos/${id}`);

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const responseJson = await response.json();

        if (responseJson.erro) {
          throw new Error(responseJson.mensagem);
        }

        setData(responseJson.produto);
      } catch (err) {
        setStatus({
          type: "erro",
          mensagem: "Erro ao carregar produto: " + err.message,
        });
      }
    };

    getProduto();
  }, [id]);

  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Visualizar Produto</Titulo>
        <BotaoAcao onClick={() => history.goBack()}>Voltar</BotaoAcao>
      </ConteudoTitulo>

      <ConteudoProduto>
        <p>
          <strong>ID: </strong>
          {data.id}
        </p>
        <p>
          <strong>Título: </strong>
          {data.titulo}
        </p>
        <p>
          <strong>Descrição: </strong>
          {data.descricao}
        </p>
      </ConteudoProduto>
    </Container>
  );
};
