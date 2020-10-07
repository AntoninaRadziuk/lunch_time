import React, { useState } from "react";
import styles from "./Home.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import { response } from "../../../Lunch_time_BACKEND/app";



export default function Home() {
  
  return (
    <div className={styles.Login}>
        <Link to="/register">Register</Link>
    </div>
  );
}
