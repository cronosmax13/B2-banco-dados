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

export const RelatorioFinanceiro = () => {
  const history = useHistory();
  const [relatorio, setRelatorio] = useState([]);
  const [totalGeral, setTotalGeral] = useState(0);
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const getRelatorio = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/relatorios/financeiro"
      );
      const data = await response.json();
      setRelatorio(data.relatorio);
      setTotalGeral(data.total_geral);
    } catch (err) {
      setStatus({
        type: "erro",
        mensagem: "Erro ao carregar relatório: " + err.message,
      });
    }
  };

  useEffect(() => {
    getRelatorio();
  }, []);

  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Relatório Financeiro</Titulo>
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
            <th>Valor Unitário</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {relatorio.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.titulo}</td>
              <td>{item.quantidade}</td>
              <td>R$ {Number(item.valor).toFixed(2)}</td>
              <td>R$ {Number(item.valor_total_estoque).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="4">
              <strong>Total Geral:</strong>
            </td>
            <td>
              <strong>R$ {Number(totalGeral).toFixed(2)}</strong>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default RelatorioFinanceiro;
