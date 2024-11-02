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
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;

  &:hover {
    background-color: #157347;
  }
`;

export const ButtonPrimary = styled.button`
  background-color: #0d6efd;
  color: #fff;
  padding: 5px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    background-color: #0b5ed7;
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
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;

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
  th {
    background-color: #ffd219;
    color: #3e3e3e;
    padding: 10px;
  }
  td {
    background-color: #f6f6f6;
    color: #3e3e3e;
    padding: 8px;
  }
`;