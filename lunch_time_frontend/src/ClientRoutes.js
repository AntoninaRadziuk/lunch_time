import React, { useContext, useEffect } from "react";
import Home from "./HomePage";
import NavBar from "./NavBarComponent";
import Profile from "./ProfilePage";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import Routes from "./Routes";
import UserContext from "./userContext";


const ClientRoutes = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    // console.log("user", userContext.user);
  }, [userContext.user]);
  
  return (
    <Route path="/">
      <NavBar />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Redirect to="/home" />
        </Switch>
    </Route>
  );
};

export default ClientRoutes;
