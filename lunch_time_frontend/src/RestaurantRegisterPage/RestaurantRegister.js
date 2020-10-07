import React, { useState } from "react";
import styles from "./RestaurantRegister.module.css";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default function RestaurantRegister() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [lunchTimeStart, setLunchTimeStart] = useState("1200");
  const [lunchTimeEnd, setLunchTimeEnd] = useState("1600");
  const [websiteAddress, setWebsiteAddress] = useState("");
  const history = useHistory();

  function validateForm() {
    return restaurantName.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.name);

    if (!validateForm()) {
      setError("Wrong login or password");
    } else {
      console.log("OK rejestration!");
    }

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
        restaurantName,
        restaurantAddress,
        lunchTimeStart,
        lunchTimeEnd,
        websiteAddress,
      }),
    })
      .then((response) => {
        response.json();
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
    if (event.target.name === "restaurant_name")
      setRestaurantName(event.target.value);
    if (event.target.name === "restaurant_address")
      setRestaurantAddress(event.target.value);
    if (event.target.name === "lunch_time_start")
      setLunchTimeStart(event.target.value);
    if (event.target.name === "lunch_time_ene")
      setLunchTimeEnd(event.target.value);
    if (event.target.name === "website_address")
      setWebsiteAddress(event.target.value);
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
        <TextField
          name="restaurant_name"
          type="text"
          label="Restaurant name"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="restaurant_address"
          type="text"
          label="Restaurant address"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="lunch_time_start"
          type="text"
          label="Lunch time start"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="lunch_time_end"
          type="text"
          label="Lunch time end"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="website_address"
          type="text"
          label="Website address"
          variant="outlined"
          onChange={handleChange}
        />
        {/* {!!error && <FormHelperText error>{error}</FormHelperText>} */}
        <Button type="submit">Create restaurant's account</Button>
      </form>
    </div>
  );
}
