import styled from "styled-components";

export const Container = styled.div`
  max-width: 960px;
  margin: 20px auto;
  padding: 0 20px;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ConteudoTitulo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;

  .button-group {
    display: flex;
    gap: 10px;
  }
`;

export const BotaoAcao = styled.button`
  background-color: #198754;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;

  &:hover {
    background-color: #157347;
  }
`;

export const Titulo = styled.h1`
  color: #3e3e3e;
  font-size: 23px;
`;

export const ButtonSuccess = styled.button`
  background-color: #198754;
  color: #fff;
  padding: 5px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 5px;

  &:hover {
    background-color: #157347;
  }
`;

export const ButtonPrimary = styled.button`
  background-color: #0d6efd;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0b5ed7;
  }

  &:active {
    background-color: #0a58ca;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ButtonWarning = styled.button`
  background-color: #ffc107;
  color: #000;
  padding: 5px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    background-color: #ffca2c;
  }
`;

export const ButtonDanger = styled.button`
  background-color: #dc3545;
  color: #fff;
  padding: 5px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #bb2d3b;
  }
`;

export const AlertSuccess = styled.p`
  background-color: #d1e7dd;
  color: #0f5132;
  margin: 20px 0;
  border: 1px solid #badbcc;
  border-radius: 4px;
  padding: 7px;
`;

export const AlertDanger = styled.p`
  background-color: #f8d7da;
  color: #842029;
  margin: 20px 0;
  border: 1px solid #f5c2c7;
  border-radius: 4px;
  padding: 7px;
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 15px;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f8f9fa;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
`;

export const BotaoCadastrar = styled.button`
  background-color: #fff;
  color: #198754;
  padding: 8px 12px;
  border: 1px solid #198754;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 8px;
  transition: all 0.3s;

  &:hover {
    background-color: #198754;
    color: #fff;
  }
`;

export const BotaoSair = styled.button`
  background-color: #fff;
  color: #4a5568;
  padding: 8px 12px;
  border: 1px solid #4a5568;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 8px;
  transition: all 0.3s;

  &:hover {
    background-color: #4a5568;
    color: #fff;
  }
`;

export const BotaoVoltar = styled.button`
  background-color: #fff;
  color: #198754;
  padding: 8px 12px;
  border: 1px solid #198754;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 8px;
  transition: all 0.3s;

  &:hover {
    background-color: #198754;
    color: #fff;
  }
`;
