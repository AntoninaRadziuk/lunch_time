import React, { useEffect, useState, useContext, Fragment } from "react";
import styles from "./MapPage.module.css";
import UserContext from "../userContext";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import picture from "../lunchenadzis.png";
import mapicon from "../map_icon.png";
import filtericon from "../filter_icon.png";
import { useHistory } from "react-router-dom";


export default function Home() {
  const userContext = useContext(UserContext);
  const history = useHistory();
 

  return (
    <div className={styles.bigBox}>
     
    </div>
  );
}
