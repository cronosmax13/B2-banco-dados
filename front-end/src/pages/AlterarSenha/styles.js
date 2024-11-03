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

export const ConteudoForm = styled.div`
  max-width: 960px;
  padding: 10px 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Form = styled.form`
  margin: 20px auto;

  div {
    margin-bottom: 15px;
  }

  .button-container {
    margin-top: 20px;
    display: flex;
    gap: 10px;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-family: sans-serif;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  margin-top: 5px;
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
  margin-left: 10px;

  &:hover {
    background-color: #198754;
    color: #fff;
  }
`;

export const AlertSuccess = styled.div`
  background-color: #d1e7dd;
  color: #0f5132;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
`;

export const AlertDanger = styled.div`
  background-color: #f8d7da;
  color: #842029;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
`;
