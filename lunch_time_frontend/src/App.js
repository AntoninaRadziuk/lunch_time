import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import Login from "./LoginPage";
import Register from "./RegisterPage";
import ClientRegister from "./ClientRegisterPage";
import RestaurantRegister from "./RestaurantRegisterPage";
import { ThemeProvider } from "@material-ui/styles";
import Home from "./HomePage";
import NavBar from "./NavBarComponent";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import Routes from "./Routes";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import theme from "./theme";
import UserContext from "./userContext";

const initialUser = {
  token: '',
  email: ''
}

function App() {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email")

  const [user, setUser] = useState({
    email: email || '',
    token: token || ''
  })

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ user, setUser }}>
          <Router>
            <Routes />
          </Router>
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
