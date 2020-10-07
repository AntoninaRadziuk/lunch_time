import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import Login from "./LoginPage";
import Register from "./RegisterPage";
import RestaurantRegister from "./RestaurantRegisterPage";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
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
