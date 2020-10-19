import React, { useState } from "react";
import styles from "./AfterAddLunch.module.css";
import Button from "@material-ui/core/Button";
import logo from "../logo.png";



export default function AfterAddLunch() {
  return (
    <div className={styles.Register}>
      <div className={styles.container}>
        <img src={logo} alt="Logo" />

        <h1 className={styles.title}>You have succesfully added lunch</h1>
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
