import React, { useState } from "react";
import styles from "./Login.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import { response } from "../../../Lunch_time_BACKEND/app";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(email);

    if (!validateForm()) {
      setError("Wrong login or password");
    }

    fetch("http://localhost:4000/users/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
    })
      .then((response) => response.json())
      .then((json) => console.log("json", json))
      .catch((err) => console.log("err", err));
  }

  const handleChange = (event) => {
    if (event.target.name === "email") setEmail(event.target.value);
    if (event.target.name === "password") setPassword(event.target.value);
  };

  return (
    <div className={styles.Login}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          onChange={handleChange}
          classes={{ root: styles.CustomInput }}
        />
        {!!error && <FormHelperText error>{error}</FormHelperText>}
        <Button type="submit">Login</Button>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
}
