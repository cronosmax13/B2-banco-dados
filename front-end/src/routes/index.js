import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Cadastrar } from "../pages/Cadastrar";
import { Editar } from "../pages/Editar";
import { Visualizar } from "../pages/Visualizar";
import CadastrarUsuario from "../pages/CadastrarUsuario";
import { AlterarSenha } from "../pages/AlterarSenha";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Rotas públicas */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/cadastrar-usuario" component={CadastrarUsuario} />
        <Route exact path="/alterar-senha" component={AlterarSenha} />

        {/* Rotas privadas */}
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/cadastrar" component={Cadastrar} />
        <PrivateRoute path="/editar/:id" component={Editar} />
        <PrivateRoute path="/visualizar/:id" component={Visualizar} />

        {/* Redireciona qualquer rota não encontrada para Home */}
        <Route path="*" component={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
