import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ path, children }) => {
  let token = "";

  if (JSON.parse(sessionStorage.getItem("user_payload")) !== null) {
    token = JSON.parse(sessionStorage.getItem("user_payload")).token;
  } else {
    token = "";
  }

  return token !== "" ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to="/login"></Redirect>
  );
};
