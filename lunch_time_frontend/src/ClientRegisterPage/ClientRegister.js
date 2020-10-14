import React, { useState } from "react";
import styles from "./ClientRegister.module.css";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import logo from "../logo.png";

export default function ClientRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState("");
  const history = useHistory();


  function handleSubmit(event) {
    event.preventDefault();

    console.log(password, passwordConfirm)

    fetch("http://localhost:4000/accounts/register/user", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, passwordConfirm }), // body data type must match "Content-Type" header
    })
      .then((response) => {
        console.log("response.status: ", response.status);
        if (response.status === 201) {
          history.push("/login");
        }
        return response.json();
      })
      // .then((json) => console.log("json", json))
      .then((json) => {
        setErrors(json);
        return console.log("json", json);
      })
      .catch((err) => console.log("err", err));
  }

  const handleChange = (event) => {
    if (event.target.name === "email") setEmail(event.target.value);
    if (event.target.name === "password") setPassword(event.target.value);
    if (event.target.name === "password_confirm")
      setPasswordConfirm(event.target.value);
  };

  return (
    <div className={styles.ClientRegister}>
      <div className={styles.container}>
        <img class="logo" src={logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <TextField
            classes={{ root: styles.CustomInput }}
            type="email"
            name="email"
            label="Email"
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
          <TextField
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            onChange={handleChange}
            classes={{ root: styles.CustomInput }}
          />
          <div className={styles.errorContainer}>
            {/* {!!errors && ( */}
            <FormHelperText
              classes={{ root: styles.error }}
              error
            ></FormHelperText>
            {/* )} */}
          </div>
          <TextField
            type="password"
            name="password_confirm"
            label="Confirm password"
            variant="outlined"
            onChange={handleChange}
            classes={{ root: styles.CustomInput }}
          />
          <div className={styles.errorContainer}>
            {!!errors.password && (
              <FormHelperText classes={{ root: styles.error }} error>
                {errors.password}
              </FormHelperText>
            )}
          </div>
          <Button
            classes={{ root: styles.button }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
