import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginForm } from "./components/login";
import { Home } from "./components/home";
import { Feeds } from "./components/feeds";
import { AppNavbar } from "./components/navbar";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./components/store/usersSlice";
import { SignUp } from "./components/signup";
import { fetchComments } from "./components/store/commentsSlice";
import { fetchPosts } from "./components/store/postSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers("users"));
    dispatch(fetchComments("comments"));
    dispatch(fetchComments("posts"));
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <AppNavbar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create-account">
              <SignUp />
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
