import React from "react";
import { useHistory } from "react-router-dom";
import { FaBox, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import { Container, MenuGrid, MenuCard, Title } from "./styles";
import { useAuth } from "../../contexts/AuthContext";

export const Menu = () => {
  const history = useHistory();
  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    history.push("/login");
  };

  return (
    <Container>
      <Title>Menu Principal</Title>
      <MenuGrid>
        <MenuCard onClick={() => history.push("/produtos")}>
          <FaBox size={40} />
          <h3>Produtos</h3>
          <p>Gerenciar produtos do sistema</p>
        </MenuCard>

        <MenuCard onClick={() => history.push("/editar-perfil")}>
          <FaUserCog size={40} />
          <h3>Editar Perfil</h3>
          <p>Gerenciar suas informações</p>
        </MenuCard>

        <MenuCard onClick={() => history.push("/estoque-baixo")}>
          <FaBox size={40} />
          <h3>Estoque Baixo</h3>
          <p>Gerenciar produtos com estoque baixo</p>
        </MenuCard>

        <MenuCard onClick={() => history.push("/relatorio-financeiro")}>
          <FaBox size={40} />
          <h3>Relatório Financeiro</h3>
          <p>Gerenciar relatório financeiro</p>
        </MenuCard>

        <MenuCard onClick={() => history.push("/usuarios")}>
          <FaUserCog size={40} />
          <h3>Usuários</h3>
          <p>Gerenciar usuários do sistema</p>
        </MenuCard>

        <MenuCard onClick={handleLogout}>
          <FaSignOutAlt size={40} />
          <h3>Sair</h3>
          <p>Deslogar do sistema</p>
        </MenuCard>
      </MenuGrid>
    </Container>
  );
};
