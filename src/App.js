import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./components/login";
import { Articles } from "./components/articles";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Articles />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
