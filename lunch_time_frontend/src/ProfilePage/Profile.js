import React, { useEffect, useState, useContext } from "react";
import styles from "./Profile.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import NavBar from "../NavBarComponent";
import UserContext from "../userContext";

export default function Profile() {
  const userContext = useContext(UserContext);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    fetch("http://localhost:4000/accounts/profile", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: userContext.user.token,
      },
    })
      .then((response) => {
        console.log(response.status);

        return response.json();
      })
      //   .then((json) => {
      //     setErrors(json);

      //     localStorage.setItem("token", json.token)
      //     localStorage.setItem("email", email)

      //     userContext.setUser({ email, token: json.token })

      //     if (!!json.token) {
      //       history.push('/home')
      //     }
      // return console.log("json", json);
      //   })
      .catch((err) => console.log("err", err));
  };

  return <div className={styles.Login}></div>;
}
