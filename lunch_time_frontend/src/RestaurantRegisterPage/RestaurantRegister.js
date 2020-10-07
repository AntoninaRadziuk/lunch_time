import React, { useState } from "react";
import styles from "./RestaurantRegister.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default function Register() {
  const [error, setError] = useState("");
  const [accountType, setAccountType] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [lunchTimeStart, setLunchTimeStart] = useState("1200");
  const [lunchTimeEnd, setLunchTimeEnd] = useState("1600");
  const [websiteAddress, setWebsiteAddress] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.name);

  }

    const handleChange = (event) => {
      if (event.target.name === "restaurant_name") setRestaurantName(event.target.value);
      if (event.target.name === "restaurant_address") setRestaurantAddress(event.target.value);
      if (event.target.name === "lunch_time_start") setLunchTimeStart(event.target.value);
      if (event.target.name === "lunch_time_ene") setLunchTimeEnd(event.target.value);
      if (event.target.name === "website_address") setWebsiteAddress(event.target.value);
    };

  return (
    <div className={styles.Register}>
      <form onSubmit={handleSubmit}>
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
        <Button type="submit">send</Button>
      </form>
    </div>
  );
}
