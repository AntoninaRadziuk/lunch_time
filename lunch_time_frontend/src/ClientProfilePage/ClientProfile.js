import React, { useEffect, useState, useContext, Fragment } from "react";
import styles from "./ClientProfile.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import NavBar from "../NavBarComponent";
import UserContext from "../userContext";
import QrReader from "react-qr-reader";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";


export default function Profile() {
  const userContext = useContext(UserContext);
  const [stampsCounter, setStampsCounter] = useState();
  const [result, setResult] = useState("");
  const [fetchCounter, setFetchCounter] = useState(0);
  const [clickedButton, setClickedButton] = useState(false);
  const history = useHistory();


  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    fetch(
      "http://localhost:4000/accounts/clientprofile" +
        `?email=${userContext.user.email}`,
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: userContext.user.token,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setStampsCounter(json.stamps_counter);
      })
      .catch((err) => console.log("err", err));
  };

  const handleScan = (data) => {
    if (!!data) {
      if (fetchCounter !== 1) {
        fetchStampsCounter(data);
        setFetchCounter(1);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const fetchStampsCounter = (result) => {
    const email = userContext.user.email;
    fetch("http://localhost:4000/accounts/stampsCounter", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: userContext.user.token,
      },
      body: JSON.stringify({
        email,
        result,
      }),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          history.push('/addedstamp')
        }
        return response.json();
      })
      .then((json) => {
        setResult(json.message);
        console.log("json", json);
      })
      .catch((err) => console.log("err", err));
  };

  const handleButton = () => {
    if (!clickedButton) setClickedButton(true);
    if (clickedButton) setClickedButton(false);
  };

  const cleanStamps = () => {
    const email = userContext.user.email;
    fetch("http://localhost:4000/accounts/cleanStamps", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: userContext.user.token,
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          history.push('/freelunchpage')
        }
        return response.json();
      })
      .then((json) => {
      })
      .catch((err) => console.log("err", err));
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{localStorage.getItem("account_type")}</h1>
      <a>email: {userContext.user.email}</a>
      <br></br>
      <a>stamps counter: {stampsCounter}</a>
      {stampsCounter === 9 && (
        <Button
          classes={{ root: styles.button }}
          variant="contained"
          color="primary"
          type="submit"
          onClick={cleanStamps}
        >
          Get free lunch!
        </Button>
      )}
      <Button
        classes={{ root: styles.button }}
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleButton}
      >
        scan qr code
      </Button>

      {clickedButton && (
        <Fragment>
          <QrReader
            className={styles.CodeReader}
            delay={500}
            onError={handleError}
            onScan={handleScan}
          />
          <p>{result}</p>
        </Fragment>
      )}
    </div>
  );
}
