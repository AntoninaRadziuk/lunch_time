import React, { useState, useContext } from "react";
import styles from "./NavBar.module.css";
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

export default function NavBar() {
  const userContext = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();

  const logOutButton = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("email", "");
    localStorage.setItem("account_type", "");
    userContext.setUser({ email: "", token: "" });
  };

  const imgClick = () => {
    history.push("/home");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.main}>
        <Toolbar>
          <img
            className={styles.logo}
            src={logo}
            alt="Logo"
            onClick={imgClick}
          />
          <Button classes={{ root: styles.buttonIn }} color="primary">
            FAVORITE RESTAURANTS
          </Button>
          <Button
            classes={{ root: styles.buttonIn }}
            color="primary"
            href="/clientprofile"
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
    </div>
  );
}
