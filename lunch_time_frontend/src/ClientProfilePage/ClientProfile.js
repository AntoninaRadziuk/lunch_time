import React, { useEffect, useState, useContext } from "react";
import styles from "./ClientProfile.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import NavBar from "../NavBarComponent";
import UserContext from "../userContext";

export default function Profile() {
  const userContext = useContext(UserContext);
  const [stampsCounter, setStampsCounter] = useState();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    fetch(
      "http://localhost:4000/accounts/clientprofile" +
        `?email=${userContext.user.email}`,
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: userContext.user.token,
        },
      }
    )
      .then((response) => {
        console.log(response.status);

        return response.json();
      })
      .then((json) => {
        setStampsCounter(json.stamps_counter);

        // localStorage.setItem("token", json.token)
        // localStorage.setItem("email", email)

        // userContext.setUser({ email, token: json.token })

        // if (!!json.token) {
        //   history.push('/home')
        // }
        console.log("json", json);
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <div className={styles.Login}>
      <div className={styles.container}>
        <h1 className={styles.title}>{localStorage.getItem("account_type")}</h1>
        <a>email: {userContext.user.email}</a>
        <br></br>
        <a>stamps counter: {stampsCounter}</a>
      </div>
    </div>
  );
}
