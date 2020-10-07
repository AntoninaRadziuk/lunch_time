import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import Login from "./LoginPage";
import Register from "./RegisterPage";
import ClientRegister from "./ClientRegisterPage";
import RestaurantRegister from "./RestaurantRegisterPage";
import Home from "./HomePage";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/clientregister">
            <ClientRegister />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/restaurantregister">
            <RestaurantRegister />
          </Route>
          <Route path={["/", "/login"]}>
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
