import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginForm } from "./components/login";
import { Home } from "./components/home";
import { Feeds } from "./components/feeds";
import { AppNavbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <AppNavbar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <LoginForm />
            </Route>
            <Route exact path="/feeds">
              <Feeds />
            </Route>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
