import React, { useState, useContext } from "react";
import styles from "./Login.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import logo from "../logo.png";
import { useHistory } from "react-router-dom";
import UserContext from '../userContext'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const history = useHistory();
  const userContext = useContext(UserContext)

  function handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:4000/accounts/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
    })
      .then((response) => {
        console.log(response.status);

        return response.json();
      })
      .then((json) => {
        setErrors(json);

        console.log(json.account_type)

        localStorage.setItem("token", json.token)
        localStorage.setItem("email", email)
        localStorage.setItem("account_type", json.account_type)
        
        userContext.setUser({ email, token: json.token, account_type: json.account_type })

        if (!!json.token && json.account_type === 'Client') {
          history.push('/home')
        }
        if (!!json.token && json.account_type === 'Restaurant') {
          history.push('/homerestaurant')
        }
      })
      .catch((err) => console.log("err", err));
  }

  const handleChange = (event) => {
    if (event.target.name === "email") setEmail(event.target.value);
    if (event.target.name === "password") setPassword(event.target.value);
  };

  return (
    <div className={styles.Login}>
      <div className={styles.container}>
        <img className="logo" src={logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <TextField
            classes={{ root: styles.CustomInput }}
            name="email"
            label="Email"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            classes={{ root: styles.CustomInput }}
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            onChange={handleChange}
          />
          <div className={styles.errorContainer}>
            {!!errors.email && (
              <FormHelperText classes={{ root: styles.error }} error>
                {errors.email}
              </FormHelperText>
            )}
          </div>
          <Button
            classes={{ root: styles.button }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </Button>
          <Link className={styles.link} to="/register">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
}
