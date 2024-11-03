import styled from "styled-components";

export const Container = styled.div`
  max-width: 960px;
  margin: 20px auto;
  padding: 0 20px;
`;

export const Title = styled.h1`
  font-size: 23px;
  color: #3e3e3e;
  margin-bottom: 30px;
`;

export const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

export const MenuCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    margin: 15px 0;
    color: #333;
  }

  p {
    color: #666;
  }
`;
