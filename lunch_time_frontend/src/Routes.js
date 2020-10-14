import React, { useState, useEffect, Fragment, useContext } from "react";
import Login from "./LoginPage";
import Register from "./RegisterPage";
import ClientRegister from "./ClientRegisterPage";
import RestaurantRegister from "./RestaurantRegisterPage";
import Home from "./HomePage";
import NavBar from "./NavBarComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import UserContext from "./userContext";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const Routes = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    // console.log("user", userContext.user);
  }, [userContext.user]);

  return (
    <Switch>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/clientregister">
        <ClientRegister />
      </Route>
      <Route path="/restaurantregister">
        <RestaurantRegister />
      </Route>
      {userContext.user.token ? (
        <PrivateRoutes />
      ) : (
        <PublicRoutes />
      )}
    </Switch>
  );
};

export default Routes;
