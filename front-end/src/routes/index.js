import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Cadastrar } from "../pages/Cadastrar";
import { Editar } from "../pages/Editar";
import { Visualizar } from "../pages/Visualizar";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Rotas públicas */}
        <Route exact path="/login" component={Login} />

        {/* Rotas protegidas */}
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/cadastrar" component={Cadastrar} />
        <PrivateRoute path="/editar/:id" component={Editar} />
        <PrivateRoute path="/visualizar/:id" component={Visualizar} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
