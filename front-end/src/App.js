import React from "react";
import Routes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { EditarPerfil } from "./pages/EditarPerfil";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/perfil" component={EditarPerfil} exact />
          <Routes />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
