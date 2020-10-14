import React, { useState } from "react";
import styles from "./Register.module.css";
import Button from "@material-ui/core/Button";
import logo from "../logo.png";



export default function Register() {
  return (
    <div className={styles.Register}>
      <div className={styles.container}>
        <img src={logo} alt="Logo" />
          <Button
            classes={{ root: styles.button }}
            variant="contained"
            color="primary"
            href="/clientregister"
          >
            Register as client
          </Button>
          <Button
            classes={{ root: styles.button }}
            variant="contained"
            color="primary"
            href="/restaurantregister"
          >
            Register as restaurant
          </Button>
        {/* </ThemeProvider> */}
      </div>
    </div>
  );
}
