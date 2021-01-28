import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { LoginForm } from "./components/login";
import { Home } from "./components/home";
import { Feeds, SingleFeedView } from "./components/feeds";
import { AppNavbar } from "./components/navbar";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./components/store/usersSlice";
import { SignUp } from "./components/signup";
import { fetchComments } from "./components/store/commentsSlice";
import { fetchPosts } from "./components/store/postSlice";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers("users"));
    dispatch(fetchComments("comments"));
    dispatch(fetchPosts("posts"));
  }, [dispatch]);

  // const { path } = useRouteMatch();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <AppNavbar />
            {/* <Route exact path="/">
              <Home />
            </Route> */}
            {/* <ProtectedRoute path="/"> */}
            <Route path="/create-account">
              <SignUp />
            </Route>
            <Route exact path="/feeds">
              <Feeds />
            </Route>
            <Route path="/feeds/:postId">
              <SingleFeedView />
            </Route>
            {/* </ProtectedRoute> */}

            <Route exact path="/login">
              <LoginForm />
            </Route>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
