import React from "react";
import { Reset } from "styled-reset";
import { Route, Router, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configStore";
import Home from "./Home";
import Header from "./Header";
import Login from "./Login";
import Singup from "./Singup";
import Detail from "./Detail";
import { useDispatch } from "react-redux";
import { actionCreators } from "./redux/modules/user";
import Upload from "./Upload";

function App() {
  const dispatch = useDispatch();
  const is_session = sessionStorage.getItem("token") ? true : false;

  React.useEffect(() => {
    if (is_session) {
      dispatch(actionCreators.userCheckDB());
    }
  }, []);

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
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/detail/:id">
            <Detail />
          </Route>
        </Switch>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
