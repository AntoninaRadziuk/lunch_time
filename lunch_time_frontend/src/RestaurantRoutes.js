import React, { useContext, useEffect } from "react";
import HomeRestaurant from "./HomePageRestaurant";
import NavBarRestaurant from "./NavBarRestaurantComponent";
import RestaurantProfile from "./RestaurantProfilePage";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import AddLunchForm from "./AddLunchFormPage"
import AfterAddLunch from "./AfterAddLunchPage"
import RestaurantOfferts from "./RestaurantOffertsPage"
import Routes from "./Routes";
import UserContext from "./userContext";


const RestaurantRoutes = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    console.log("user", userContext.user);
  }, [userContext.user]);
  
  return (
    <Route path="/">
      <NavBarRestaurant />
        <Switch>
          <Route path="/homerestaurant">
            <HomeRestaurant />
          </Route>
          <Route path="/restaurantprofile">
            <RestaurantProfile />
          </Route>
          <Route path="/addlunch">
            <AddLunchForm />
          </Route>
          <Route path="/restaurantofferts">
            <RestaurantOfferts />
          </Route>
          <Route path="/afteraddlunch">
            <AfterAddLunch />
          </Route>
          <Redirect to="/homerestaurant" />
        </Switch>
    </Route>
  );
};

export default RestaurantRoutes;
