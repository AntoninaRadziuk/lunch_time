import React, { useState } from "react";
import styles from "./HomeRestaurant.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import NavBar from "../NavBarComponent";



export default function HomeRestaurant() {
  
  return (
    <div className={styles.Login}>
        {/* <NavBar></NavBar> */}
        {/* <Link to="/register">Register</Link> */}
    </div>
  );
}
