import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  ConteudoTitulo,
  Titulo,
  Table,
  AlertDanger,
  BotaoVoltar,
} from "../Produtos/styles";

export const EstoqueBaixo = () => {
  const history = useHistory();
  const [produtos, setProdutos] = useState([]);
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const getProdutosBaixoEstoque = async () => {
    try {
      console.log("Iniciando busca de produtos com estoque baixo");
      const response = await fetch(
        "http://localhost:8000/relatorios/estoque-baixo"
      );
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      const data = await response.json();
      console.log("Resposta completa:", data);
      console.log("Produtos:", data.produtos);
      setProdutos(data.produtos || []);
    } catch (err) {
      console.error("Erro na requisição:", err);
      setStatus({
        type: "erro",
        mensagem: "Erro ao carregar produtos: " + err.message,
      });
      setProdutos([]);
    }
  };

  useEffect(() => {
    getProdutosBaixoEstoque();
  }, []);

  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Produtos com Estoque Baixo</Titulo>
        <BotaoVoltar onClick={() => history.push("/menu")}>
          Voltar ao Menu
        </BotaoVoltar>
      </ConteudoTitulo>

      {status.type === "erro" && <AlertDanger>{status.mensagem}</AlertDanger>}

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Quantidade</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {produtos?.length > 0 ? (
            produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.titulo}</td>
                <td>{produto.quantidade}</td>
                <td
                  style={{
                    color:
                      produto.quantidade === 0
                        ? "#dc3545"
                        : produto.quantidade < 5
                        ? "#ffc107"
                        : "#198754",
                  }}
                >
                  {produto.status_estoque}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Nenhum produto com estoque baixo encontrado
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};
