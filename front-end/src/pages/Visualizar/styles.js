import styled from "styled-components";

export const Container = styled.div`
  max-width: 960px;
  margin: 20px auto;
  padding: 0 20px;
`;

export const ConteudoTitulo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Titulo = styled.h1`
  font-size: 23px;
  font-family: sans-serif;
  margin: 0;
`;

export const BotaoAcao = styled.button`
  background-color: #fff;
  color: #198754;
  padding: 8px 12px;
  border: 1px solid #198754;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;

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
