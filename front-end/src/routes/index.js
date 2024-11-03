import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

import { Login } from "../pages/Login";
import { Produtos } from "../pages/Produtos";
import { Cadastrar } from "../pages/Cadastrar";
import { Editar } from "../pages/Editar";
import { Visualizar } from "../pages/Visualizar";
import CadastrarUsuario from "../pages/CadastrarUsuario";
import { AlterarSenha } from "../pages/AlterarSenha";
import { Menu } from "../pages/Menu";
import { EditarPerfil } from "../pages/EditarPerfil";
import { RelatorioFinanceiro } from "../pages/RelatorioFinanceiro";
import { EstoqueBaixo } from "../pages/EstoqueBaixo";
import { Usuarios } from "../pages/Usuarios";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Rotas públicas */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/cadastrar-usuario" component={CadastrarUsuario} />
        <Route exact path="/alterar-senha" component={AlterarSenha} />

        {/* Rotas privadas */}
        <PrivateRoute exact path="/" component={Produtos} />
        <PrivateRoute path="/cadastrar" component={Cadastrar} />
        <PrivateRoute path="/editar/:id" component={Editar} />
        <PrivateRoute path="/visualizar/:id" component={Visualizar} />
        <PrivateRoute path="/menu" component={Menu} />
        <PrivateRoute path="/editar-perfil" component={EditarPerfil} />
        <PrivateRoute
          path="/relatorio-financeiro"
          component={RelatorioFinanceiro}
        />
        <PrivateRoute path="/estoque-baixo" component={EstoqueBaixo} />
        <PrivateRoute path="/usuarios" component={Usuarios} />

        {/* Redireciona qualquer rota não encontrada para Home */}
        <Route path="*" component={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
