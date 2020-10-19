import React, { Fragment, useContext, useEffect } from "react";
import Home from "./HomePage";
import NavBar from "./NavBarComponent";
import ClientProfile from "./ClientProfilePage";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import Routes from "./Routes";
import UserContext from "./userContext";
import ClientRoutes from "./ClientRoutes"
import RestaurantRoutes from "./RestaurantRoutes"


const PrivateRoutes = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    console.log("user", userContext.user);
  }, [userContext.user]);
  
  return (
    <Fragment>
    {/* {userContext.user.account_type === 'Client' ? (<ClientRoutes />) : (<RestaurantRoutes />)} */}
    {localStorage.getItem("account_type") === 'Client' ? (<ClientRoutes />) : (<RestaurantRoutes />)}
    </Fragment>
    // <Route path="/">
    //   <NavBar />
    //     <Switch>
    //       <Route path="/home">
    //         <Home />
    //       </Route>
    //       <Route path="/profile">
    //         <Profile />
    //       </Route>
    //       <Redirect to="/home" />
    //     </Switch>
    // </Route>
  );
};

export default PrivateRoutes;
