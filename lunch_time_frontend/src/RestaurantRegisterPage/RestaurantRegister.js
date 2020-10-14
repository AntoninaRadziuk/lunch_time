import React, { useState } from "react";
import styles from "./RestaurantRegister.module.css";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import logo from "../logo.png";

export default function RestaurantRegister() {
  const [errors, setErrors] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [lunchTimeStart, setLunchTimeStart] = useState("");
  const [lunchTimeEnd, setLunchTimeEnd] = useState("");
  const [websiteAddress, setWebsiteAddress] = useState("");
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.name);

    fetch("http://localhost:4000/accounts/register/restaurant", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        passwordConfirm,
        restaurantName,
        restaurantAddress,
        lunchTimeStart,
        lunchTimeEnd,
        websiteAddress,
      }),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 201) {
          history.push("/login");
        }
        return response.json();
      })
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
    if (event.target.name === "restaurant_name")
      setRestaurantName(event.target.value);
    if (event.target.name === "restaurant_address")
      setRestaurantAddress(event.target.value);
    if (event.target.name === "lunch_time_start")
      setLunchTimeStart(event.target.value);
    if (event.target.name === "lunch_time_end")
      setLunchTimeEnd(event.target.value);
    if (event.target.name === "website_address")
      setWebsiteAddress(event.target.value);
  };

  return (
    <div className={styles.RestaurantRegister}>
      <div className={styles.container}>
        <img class="logo" src={logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            classes={{ root: styles.CustomInput }}
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
            {/* {!!error && ( */}
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
          <TextField
            name="restaurant_name"
            type="text"
            label="Restaurant name"
            variant="outlined"
            onChange={handleChange}
            classes={{ root: styles.CustomInput }}
          />
          <div className={styles.errorContainer}>
            {!!errors.restaurantName && (
              <FormHelperText classes={{ root: styles.error }} error>
                {errors.restaurantName}
              </FormHelperText>
            )}
          </div>
          <TextField
            name="restaurant_address"
            type="text"
            label="Restaurant address"
            variant="outlined"
            onChange={handleChange}
            classes={{ root: styles.CustomInput }}
          />
          <div className={styles.errorContainer}>
            {!!errors.restaurantAddress && (
              <FormHelperText classes={{ root: styles.error }} error>
                {errors.restaurantAddress}
              </FormHelperText>
            )}
          </div>
          <TextField
            name="lunch_time_start"
            type="text"
            label="Lunch time start"
            variant="outlined"
            onChange={handleChange}
            classes={{ root: styles.CustomInput }}
          />
          <div className={styles.errorContainer}>
            {!!errors.lunchTimeStart && (
              <FormHelperText classes={{ root: styles.error }} error>
                {errors.lunchTimeStart}
              </FormHelperText>
            )}
          </div>
          <TextField
            name="lunch_time_end"
            type="text"
            label="Lunch time end"
            variant="outlined"
            onChange={handleChange}
            classes={{ root: styles.CustomInput }}
          />
          <div className={styles.errorContainer}>
            {!!errors.lunchTimeEnd && (
              <FormHelperText classes={{ root: styles.error }} error>
                {errors.lunchTimeEnd}
              </FormHelperText>
            )}
          </div>
          <TextField
            name="website_address"
            type="url"
            label="Website address"
            variant="outlined"
            onChange={handleChange}
            classes={{ root: styles.CustomInput }}
          />
          <div className={styles.errorContainer}>
            {/* {!!error && ( */}
            <FormHelperText classes={{ root: styles.error }} error>
              {/* {error} */}
            </FormHelperText>
          </div>
          <Button
            classes={{ root: styles.button }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Create restaurant's account
          </Button>
        </form>
      </div>
    </div>
  );
}
