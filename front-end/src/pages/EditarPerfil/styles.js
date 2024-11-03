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
  font-size: 24px;
  color: #333;
`;

export const ConteudoForm = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Label = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: #fff;
  color: #4a5568;

  &:focus {
    outline: none;
    border-color: #198754;
    box-shadow: 0 0 0 2px rgba(25, 135, 84, 0.1);
  }

  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
    border-color: #e2e8f0;
  }

  &::placeholder {
    color: #a0aec0;
  }
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

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  margin-top: 5px;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #198754;
    box-shadow: 0 0 0 2px rgba(25, 135, 84, 0.25);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`;
