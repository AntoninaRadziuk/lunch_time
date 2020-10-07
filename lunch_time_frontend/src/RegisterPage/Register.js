import React, { useState } from "react";
import styles from "./Register.module.css";
import restaurantRegister from "../RestaurantRegisterPage";
import { BrowserRouter as useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Button from "@material-ui/core/Button";

export default function Register() {
  return (
    <div className={styles.Register}>
      <Button variant="contained" color="primary" href="/clientregister">
        Register as client
      </Button>
      <Button variant="contained" color="primary" href="/restaurantregister">
        Register as restaurant
      </Button>
    </div>
  );
}
