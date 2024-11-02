import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

export const ConteudoForm = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Label = styled.label`
  color: #333;
  font-size: 16px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #0d6efd;
  }
`;

export const ButtonSuccess = styled.button`
  background-color: #198754;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #157347;
  }
`;

export const AlertSuccess = styled.div`
  background-color: #d1e7dd;
  color: #0f5132;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const AlertDanger = styled.div`
  background-color: #f8d7da;
  color: #842029;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
`;
