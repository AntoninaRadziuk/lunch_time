import React, { useState, useContext } from "react";
import styles from "./NavBarRestaurant.module.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import logo from "../logo.png";
import { createMuiTheme } from "@material-ui/core/styles";
import UserContext from "../userContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "transparent",
    color: "black",
  },
  title: {
    flexGrow: 1,
    marginLeft: -250,
  },
}));

const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        color: "white",
      },
    },
  },
});

export default function NavBarRestaurant() {
  const userContext = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();

  const logOutButton = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("email", "");
    localStorage.setItem("account_type", "");
    userContext.setUser({ email: "", token: "", account_type: "" });
  };

  const imgClick = () => {
    history.push("/homerestaurant");
  };

  return (

      <AppBar position="relative" className={classes.main}>
        <Toolbar>
          <img
            className={styles.logo}
            src={logo}
            alt="Logo"
            onClick={imgClick}
          />
          <Button
            classes={{ root: styles.buttonIn }}
            color="primary"
            href="/addlunch"
            variant="outlined"
          >
            Add lunch
          </Button>
          <Button
            classes={{ root: styles.buttonIn }}
            color="primary"
            href="/restaurantofferts"
          >
            my offerts
          </Button>
          <Button
            classes={{ root: styles.buttonIn }}
            color="primary"
            href="/restaurantprofile"
          >
            My profile
          </Button>
          <Button
            classes={{ root: styles.buttonIn }}
            color="secondary"
            onClick={logOutButton}
          >
            Sign out
          </Button>
        </Toolbar>
      </AppBar>

  );
}
