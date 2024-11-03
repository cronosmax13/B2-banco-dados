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
  const [loading, setLoading] = useState(true);

  const getRelatorio = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:8000/relatorios/financeiro"
      );
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      const data = await response.json();
      if (data.erro) {
        throw new Error(data.mensagem);
      }
      setRelatorio(data.relatorio || []);
      setTotalGeral(data.total_geral || 0);
    } catch (err) {
      setStatus({
        type: "erro",
        mensagem: "Erro ao carregar relatório: " + err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        await getRelatorio();
      } catch (error) {
        if (mounted) {
          setStatus({
            type: "erro",
            mensagem: "Erro ao carregar relatório: " + error.message,
          });
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Container>
        <ConteudoTitulo>
          <Titulo>Relatório Financeiro</Titulo>
          <BotaoVoltar onClick={() => history.push("/menu")}>
            Voltar ao Menu
          </BotaoVoltar>
        </ConteudoTitulo>
        <p>Carregando...</p>
      </Container>
    );
  }

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
          {relatorio && relatorio.length > 0 ? (
            <>
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
            </>
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Nenhum item encontrado
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default RelatorioFinanceiro;
