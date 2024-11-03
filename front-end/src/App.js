import React from "react";
import Routes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { EditarPerfil } from "./pages/EditarPerfil";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { EstoqueBaixo } from "./pages/EstoqueBaixo";
import { RelatorioFinanceiro } from "./pages/RelatorioFinanceiro";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/perfil" component={EditarPerfil} exact />
          <Route path="/estoque-baixo" component={EstoqueBaixo} />
          <Route path="/relatorio-financeiro" component={RelatorioFinanceiro} />
          <Routes />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
