import styled from "styled-components";

export const Container = styled.div`
  max-width: 960px;
  margin: 20px auto;
  padding: 0 15px;
`;

export const ConteudoTitulo = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Titulo = styled.h1`
  font-size: 23px;
  color: #3e3e3e;
`;

export const BotaoAcao = styled.button`
  padding: 8px 12px;
  background-color: #fff;
  color: #198754;
  border: 1px solid #198754;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #198754;
    color: #fff;
  }
`;

export const ConteudoProduto = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  p {
    margin: 10px 0;
    font-family: sans-serif;
    line-height: 1.5;
  }

  strong {
    color: #333;
  }
`;

export const AlertDanger = styled.p`
  color: #dc3545;
  margin-bottom: 10px;

  strong {
    margin-right: 5px;
  }
`;
