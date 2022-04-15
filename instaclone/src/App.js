import React from "react";
import { Reset } from "styled-reset";
import { Route, Router, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configStore";
import Home from "./Home";
import Header from "./Header";
import Login from "./Login";
import Singup from "./Singup";

function App() {
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/signup">
            <Singup />
          </Route>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
        </Switch>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
