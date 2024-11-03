import React from "react";
import { useHistory } from "react-router-dom";
import { FaBox, FaUserCog } from "react-icons/fa";
import { Container, MenuGrid, MenuCard, Title } from "./styles";

export const Menu = () => {
  const history = useHistory();

  return (
    <Container>
      <Title>Menu Principal</Title>
      <MenuGrid>
        <MenuCard onClick={() => history.push("/")}>
          <FaBox size={40} />
          <h3>Produtos</h3>
          <p>Gerenciar produtos do sistema</p>
        </MenuCard>

        <MenuCard onClick={() => history.push("/perfil")}>
          <FaUserCog size={40} />
          <h3>Perfil</h3>
          <p>Gerenciar suas informações</p>
        </MenuCard>
      </MenuGrid>
    </Container>
  );
};
