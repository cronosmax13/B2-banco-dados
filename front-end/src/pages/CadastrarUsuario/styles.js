import styled from "styled-components";

export const Container = styled.div`
  max-width: 960px;
  margin: 20px auto;
  padding: 0 15px;
`;

export const ConteudoForm = styled.section`
  max-width: 500px;
  margin: 0 auto;
  background-color: #f8f9fa;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export const ConteudoTitulo = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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

export const ButtonSuccess = styled.button`
  background-color: #198754;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  font-size: 16px;

  &:hover {
    background-color: #146c43;
  }
`;

export const AlertSuccess = styled.p`
  background-color: #d1e7dd;
  color: #0f5132;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
`;

export const AlertDanger = styled.p`
  background-color: #f8d7da;
  color: #842029;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
`;

export const Form = styled.form`
  margin-top: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #198754;
    box-shadow: 0 0 0 2px rgba(25, 135, 84, 0.25);
  }
`;
