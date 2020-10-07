import React, { useState } from "react";
import styles from "./ClientRegister.module.css";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default function ClientRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      passwordConfirm === passwordConfirm
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.name);

    if (!validateForm()) {
      setError("Wrong login or password");
    } else {
      console.log("OK rejestration!");
    }

      console.log("CLIENT_BUTTON");
      fetch("http://localhost:4000/accounts/register/user", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
      })
        .then((response) => {
          response.json()
          console.log(response.status);
          if (response.status === 201) {
            history.push("/home");
          }
        })
        .then((json) => console.log("json", json))
        .catch((err) => console.log("err", err));
  }

  const handleChange = (event) => {
    if (event.target.name === "email") setEmail(event.target.value);
    if (event.target.name === "password") setPassword(event.target.value);
    if (event.target.name === "password_confirm")
      setPasswordConfirm(event.target.value);
  };

  return (
    <div className={styles.Register}>
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
        <TextField
          type="password"
          name="password_confirm"
          label="Confirm password"
          variant="outlined"
          onChange={handleChange}
          classes={{ root: styles.CustomInput }}
        />
        {!!error && <FormHelperText error>{error}</FormHelperText>}
        <Button type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}
