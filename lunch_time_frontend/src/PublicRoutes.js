import React from "react";
import Login from "./LoginPage";
import { Switch, Route, Redirect } from "react-router-dom";

const PublicRoutes = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
};

export default PublicRoutes;
