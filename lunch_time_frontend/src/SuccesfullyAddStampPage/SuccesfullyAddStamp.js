import React, { useState } from "react";
import styles from "./SuccesfullyAddStamp.module.css";
import Button from "@material-ui/core/Button";
import logo from "../logo.png";



export default function SuccesfullyAddStamp() {
  return (
    <div className={styles.Register}>
      <div className={styles.container}>
        <img src={logo} alt="Logo" />

        <h1 className={styles.title}>You have succesfully added a stamp!</h1>
          <Button
            classes={{ root: styles.button }}
            variant="contained"
            color="primary"
            href="/homerestaurant"
          >
            Back to home page
          </Button>
      </div>
    </div>
  );
}
