import React, { useContext, useEffect } from "react";
import Home from "./HomePage";
import NavBar from "./NavBarComponent";
import MapPage from "./MapPage"
import ClientProfile from "./ClientProfilePage";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import Routes from "./Routes";
import UserContext from "./userContext";


const ClientRoutes = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    console.log("user", userContext.user.account_type);
  }, [userContext.user]);
  
  return (
    <Route path="/">
      <NavBar />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/mappage">
            <MapPage />
          </Route>
          <Route path="/clientprofile">
            <ClientProfile />
          </Route>
          <Redirect to="/home" />
        </Switch>
    </Route>
  );
};

export default ClientRoutes;
