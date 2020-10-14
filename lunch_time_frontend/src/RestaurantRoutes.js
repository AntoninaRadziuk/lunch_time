import React, { useContext, useEffect } from "react";
import HomeRestaurant from "./HomePageRestaurant";
import NavBarRestaurant from "./NavBarRestaurantComponent";
import Profile from "./ProfilePage";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import Routes from "./Routes";
import UserContext from "./userContext";


const RestaurantRoutes = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    // console.log("user", userContext.user);
  }, [userContext.user]);
  
  return (
    <Route path="/">
      <NavBarRestaurant />
        <Switch>
          <Route path="/homerestaurant">
            <HomeRestaurant />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Redirect to="/homerestaurant" />
        </Switch>
    </Route>
  );
};

export default RestaurantRoutes;
