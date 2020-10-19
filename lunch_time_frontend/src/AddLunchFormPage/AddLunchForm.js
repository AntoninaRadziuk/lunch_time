import React, { useEffect, useState, useContext, Fragment } from "react";
import styles from "./AddLunchForm.module.css";
import UserContext from "../userContext";
import TextField from "@material-ui/core/TextField";
import { FormHelperText, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";


export default function AddLunchForm() {
  const userContext = useContext(UserContext);
  const [soupsTable, setSoupsTable] = useState(["a", "", "", "", "", ""]);
  const [soupsIndex, setSoupsIndex] = useState(0);
  const [dishTable, setDishTable] = useState(["a", "", "", "", "", ""]);
  const [dishIndex, setDishIndex] = useState(0);
  const [drinksTable, setDrinksTable] = useState(["a", "", "", "", "", ""]);
  const [drinksIndex, setDrinksIndex] = useState(0);
  const [soupPrice, setSoupPrice] = useState();
  const [dishPrice, setDishPrice] = useState();
  const [drinkPrice, setDrinkPrice] = useState();
  const [setPrice, setSetPrice] = useState();
  const [setAndDrinkPrice, setSetAndDrinkPrice] = useState();
  const [date, setDate] = useState();
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [errors, setErrors] = useState("");
  const [errorsComponents, setErrorsComponents] = useState("");
  const [errorDish, setErrorDish] = useState("");
  const history = useHistory();
  // const [firstOperationStatus, setFirstOperationStatus] = useState(404);

  function handleSubmit(event) {
    event.preventDefault();

    if (dishTable[0] !== "a") {
      setErrorDish("");

      fetch("http://localhost:4000/restaurant/addlunch/offert", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: userContext.user.token,
        },
        body: JSON.stringify({
          email,
          soupPrice,
          dishPrice,
          drinkPrice,
          setPrice,
          setAndDrinkPrice,
          date,
        }),
      })
        .then((response) => {
          console.log(response.status);

          if (response.status === 201) {
            fetch("http://localhost:4000/restaurant/addlunch/component", {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              mode: "cors",
              cache: "no-cache",
              headers: {
                "Content-Type": "application/json",
                Authorization: userContext.user.token,
              },
              body: JSON.stringify({
                email,
                soupsTable,
                dishTable,
                drinksTable,
              }),
            })
              .then((response) => {
                console.log(response.status);
                return response.json();
              })
              .then((json) => {
                setErrorsComponents(json);
              })
              .catch((err) => console.log("err", err));
          }

          return response.json();
        })
        .then((json) => {
          setErrors(json);
          history.push('/afteraddlunch')
        })
        .catch((err) => console.log("err", err));
    } else {
      setErrorDish("At least one dish is required!");
    }
  }

  const handleChange = (event) => {
    if (event.target.name === "soup") {
      soupsTable[soupsIndex] = event.target.value;
      setSoupsTable(soupsTable);
    }
    if (event.target.name === "soup_price") {
      setSoupPrice(event.target.value);
    }
    if (event.target.name === "dish") {
      dishTable[dishIndex] = event.target.value;
      setDishTable(dishTable);
    }
    if (event.target.name === "dish_price") {
      setDishPrice(event.target.value);
    }
    if (event.target.name === "drink") {
      drinksTable[drinksIndex] = event.target.value;
      setDrinksTable(drinksTable);
    }
    if (event.target.name === "drink_price") {
      setDrinkPrice(event.target.value);
    }
    if (event.target.name === "set_price") {
      setSetPrice(event.target.value);
    }
    if (event.target.name === "set_and_drink_price") {
      setSetAndDrinkPrice(event.target.value);
    }
    if (event.target.name === "date") {
      setDate(event.target.value);
    }
  };

  const soupClick = (event) => {
    if ((event.target.name = "soup")) {
      if (soupsTable[soupsIndex] !== "" && soupsTable[0] !== "a") {
        setSoupsIndex(soupsIndex + 1);
      }
    }
  };

  const dishClick = (event) => {
    if ((event.target.name = "dish")) {
      if (dishTable[dishIndex] !== "" && dishTable[0] !== "a") {
        setDishIndex(dishIndex + 1);
      }
    }
  };

  const drinkClick = (event) => {
    if ((event.target.name = "dish")) {
      if (drinksTable[drinksIndex] !== "" && drinksTable[0] !== "a") {
        setDrinksIndex(drinksIndex + 1);
      }
    }
  };

  return (
    <div className={styles.Login}>
      <div className={styles.box}>
        <div className={styles.BigContainer}>
          <h1 className={styles.title}>Add lunch offert</h1>

          <form onSubmit={handleSubmit}>
            <div className={styles.container}>
              <div className={styles.smallerContainer}>
                <h1 className={styles.dishes}>Soups</h1>
                <br></br>
                <TextField
                  classes={{ root: styles.CustomInputPrice }}
                  name="soup_price"
                  label="Soup price"
                  variant="outlined"
                  size="small"
                  onChange={handleChange}
                />
                {soupsTable.map((element, index) =>
                  index <= soupsIndex ? (
                    <TextField
                      key={index}
                      classes={{ root: styles.CustomInputDish }}
                      name="soup"
                      label="Soup"
                      variant="outlined"
                      multiline
                      rowsMax={4}
                      onChange={handleChange}
                    />
                  ) : (
                    <Fragment></Fragment>
                  )
                )}
                <div>
                  <IconButton
                    classes={{ root: styles.PlusButton }}
                    size="small"
                    name="soup"
                    onClick={soupClick}
                  >
                    <AddIcon classes={{ root: styles.Icon }} color="primary" />
                  </IconButton>
                </div>
              </div>
              <div className={styles.smallerContainerDish}>
                <h1 className={styles.dishes}>Main dishes</h1>
                <br></br>
                <TextField
                  classes={{ root: styles.CustomInputPrice }}
                  name="dish_price"
                  label="Main dish price"
                  variant="outlined"
                  size="small"
                  onChange={handleChange}
                />
                {dishTable.map((element, index) =>
                  index <= dishIndex ? (
                    <TextField
                      key={index}
                      classes={{ root: styles.CustomInputDish }}
                      name="dish"
                      label="Dish"
                      variant="outlined"
                      onChange={handleChange}
                    />
                  ) : (
                    <Fragment></Fragment>
                  )
                )}
                <div>
                  <IconButton
                    classes={{ root: styles.PlusButton }}
                    size="small"
                    name="dish"
                    onClick={dishClick}
                  >
                    <AddIcon classes={{ root: styles.Icon }} color="primary" />
                  </IconButton>
                </div>
              </div>
              <div className={styles.smallerContainer}>
                <h1 className={styles.dishes}>Drinks</h1>
                <br></br>
                <TextField
                  classes={{ root: styles.CustomInputPrice }}
                  name="drink_price"
                  label="Drink price"
                  variant="outlined"
                  size="small"
                  onChange={handleChange}
                />
                {drinksTable.map((element, index) =>
                  index <= drinksIndex ? (
                    <TextField
                      key={index}
                      classes={{ root: styles.CustomInputPrice }}
                      name="drink"
                      label="Drink"
                      variant="outlined"
                      onChange={handleChange}
                    />
                  ) : (
                    <Fragment></Fragment>
                  )
                )}
                <div>
                  <IconButton
                    classes={{ root: styles.PlusButton }}
                    size="small"
                    name="drink"
                    onClick={drinkClick}
                  >
                    <AddIcon classes={{ root: styles.Icon }} color="primary" />
                  </IconButton>
                </div>
              </div>
            </div>
            <div className={styles.BottomContainer}>
              <div className={styles.errorContainer}>
                {!!errors.message && (
                  <FormHelperText classes={{ root: styles.error }} error>
                    {errors.message}
                  </FormHelperText>
                )}
                {!!errorsComponents.message && (
                  <FormHelperText classes={{ root: styles.error }} error>
                    {errorsComponents.message}
                  </FormHelperText>
                )}
                {!!errorDish && (
                  <FormHelperText classes={{ root: styles.error }} error>
                    {errorDish}
                  </FormHelperText>
                )}
              </div>
              <TextField
                classes={{ root: styles.CustomInputPriceBottom }}
                name="date"
                label="Date (DD/MM/RRRR)"
                variant="outlined"
                size="small"
                onChange={handleChange}
              />
              <TextField
                classes={{ root: styles.CustomInputPriceBottom }}
                name="set_price"
                label="Set price"
                variant="outlined"
                size="small"
                onChange={handleChange}
              />
              <TextField
                classes={{ root: styles.CustomInputPriceBottom }}
                name="set_and_drink_price"
                label="Set with drink price"
                variant="outlined"
                size="small"
                onChange={handleChange}
              />
              <Button
                classes={{ root: styles.button }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Add your lunch
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
