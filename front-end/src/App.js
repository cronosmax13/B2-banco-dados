import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Routes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { Home } from "./pages/Home";
import { Visualizar } from "./pages/Visualizar";
import { Editar } from "./pages/Editar";
import { Cadastrar } from "./pages/Cadastrar";
import { Login } from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/visualizar/:id" component={Visualizar} />
          <Route path="/editar/:id" component={Editar} />
          <Route path="/cadastrar" component={Cadastrar} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
