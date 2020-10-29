import React, { useState, useContext, useEffect } from "react";
import styles from "./RestaurantUpdateData.module.css";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import UserContext from "../userContext";

export default function RestaurantUpdateData() {
  const userContext = useContext(UserContext);
  const [currentData, setCurrentData] = useState({});

  const [errors, setErrors] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [lunchTimeStart, setLunchTimeStart] = useState("");
  const [lunchTimeEnd, setLunchTimeEnd] = useState("");
  const [soupPrice, setSoupPrice] = useState();
  const [dishPrice, setDishPrice] = useState();
  const [setPrice, setSetPrice] = useState();
  const [setAndDrinkPrice, setSetAndDrinkPrice] = useState();
  const [websiteAddress, setWebsiteAddress] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetchRestaurantProfileUpdate();
  }, []);

  const fetchRestaurantProfileUpdate = () => {
    fetch(
      "http://localhost:4000/restaurant/startupdatedata" +
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
        console.log(response.status);
        // if (response.status === 201) {
        // history.push("/restaurantprofile");}
        return response.json();
      })
      .then((json) => {
        setCurrentData(json.data);
        console.log("json", json);
      })
      .catch((err) => console.log("err", err));
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.name);
    const email = userContext.user.email;

    fetch("http://localhost:4000/restaurant/updatedata", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: userContext.user.token,
      },
      body: JSON.stringify({
        email,
        restaurantName,
        restaurantAddress,
        lunchTimeStart,
        lunchTimeEnd,
        soupPrice,
        dishPrice,
        setPrice,
        setAndDrinkPrice,
        websiteAddress,
      }),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 201) {
          history.push("/restaurantprofile");
        }
        return response.json();
      })
      .then((json) => {
        setErrors(json);
        return console.log("json", json);
      })
      .catch((err) => console.log("err", err));
  }

  const handleChange = (event) => {
    // if (event.target.name === "email") setEmail(event.target.value);
    // if (event.target.name === "password") setPassword(event.target.value);
    // if (event.target.name === "password_confirm")
    // setPasswordConfirm(event.target.value);
    if (event.target.name === "restaurant_name")
      setRestaurantName(event.target.value);
    if (event.target.name === "restaurant_address")
      setRestaurantAddress(event.target.value);
    if (event.target.name === "lunch_time_start")
      setLunchTimeStart(event.target.value);
    if (event.target.name === "lunch_time_end")
      setLunchTimeEnd(event.target.value);
    if (event.target.name === "soup_price") setSoupPrice(event.target.value);
    if (event.target.name === "dish_price") setDishPrice(event.target.value);
    if (event.target.name === "set_price") setSetPrice(event.target.value);
    if (event.target.name === "set_and_drink_price")
      setSetAndDrinkPrice(event.target.value);
    if (event.target.name === "website_address")
      setWebsiteAddress(event.target.value);
  };

  return (
    <div className={styles.RestaurantRegister}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="restaurant_name"
            type="text"
            label={!currentData.name && "Restaurant name"}
            variant="outlined"
            // autoFocus='true'
            onChange={handleChange}
            defaultValue={currentData.name}
            classes={{ root: styles.CustomInput }}
          />
          <div className={styles.errorContainer}>
              {/* {!!error && ( */}
              <FormHelperText classes={{ root: styles.error }} error>
                {/* {error} */}
              </FormHelperText>
            </div>
          <TextField
            name="restaurant_address"
            type="text"
            label="Restaurant address"
            variant="outlined"
            // autoFocus='true'
            onChange={handleChange}
            value={currentData.address}
            classes={{ root: styles.CustomInput }}
          />
          <div className={styles.errorContainer}>
              {/* {!!error && ( */}
              <FormHelperText classes={{ root: styles.error }} error>
                {/* {error} */}
              </FormHelperText>
            </div>
          <TextField
            name="lunch_time_start"
            type="text"
            label="Lunch time start"
            variant="outlined"
            onChange={handleChange}
            value={currentData.lunchStartTime}
            classes={{ root: styles.CustomInput }}
          />
          <div className={styles.errorContainer}>
              {/* {!!error && ( */}
              <FormHelperText classes={{ root: styles.error }} error>
                {/* {error} */}
              </FormHelperText>
            </div>
          <TextField
            name="lunch_time_end"
            type="text"
            label="Lunch time end"
            variant="outlined"
            onChange={handleChange}
            value={currentData.lunchEndTime}
            classes={{ root: styles.CustomInput }}
          />
          <div className={styles.errorContainer}>
              {/* {!!error && ( */}
              <FormHelperText classes={{ root: styles.error }} error>
                {/* {error} */}
              </FormHelperText>
            </div>
          <TextField
            name="website_address"
            type="url"
            label="Website address"
            variant="outlined"
            onChange={handleChange}
            value={currentData.websiteAddress}
            classes={{ root: styles.CustomInput }}
          />
          <div className={styles.errorContainer}>
              {/* {!!error && ( */}
              <FormHelperText classes={{ root: styles.error }} error>
                {/* {error} */}
              </FormHelperText>
            </div>
          <div className={styles.PricesContainer}>
            <TextField
              name="soup_price"
              type="text"
              label="Soup price"
              variant="outlined"
              onChange={handleChange}
              value={currentData.soupPrice}
              classes={{ root: styles.CustomInput }}
            />
            <div className={styles.errorContainer}>
              {/* {!!error && ( */}
              <FormHelperText classes={{ root: styles.error }} error>
                {/* {error} */}
              </FormHelperText>
            </div>
            <TextField
              name="dish_price"
              type="text"
              label="Dish price"
              variant="outlined"
              onChange={handleChange}
              value={currentData.dishPrice}
              classes={{ root: styles.CustomInput }}
            />
            <div className={styles.errorContainer}>
              {!!errors.dishPrice && (
                <FormHelperText classes={{ root: styles.error }} error>
                  {errors.dishPrice}
                </FormHelperText>
              )}
            </div>
            <TextField
              name="set_price"
              type="text"
              label="Set price"
              variant="outlined"
              onChange={handleChange}
              value={currentData.setPrice}
              classes={{ root: styles.CustomInput }}
            />
            <div className={styles.errorContainer}>
              {/* {!!error && ( */}
              <FormHelperText classes={{ root: styles.error }} error>
                {/* {error} */}
              </FormHelperText>
            </div>
            <TextField
              name="set_and_drink_price"
              type="text"
              label="Set and drink price"
              variant="outlined"
              onChange={handleChange}
              value={currentData.setAndDrinkPrice}
              classes={{ root: styles.CustomInput }}
            />
            <div className={styles.errorContainer}>
              {/* {!!error && ( */}
              <FormHelperText classes={{ root: styles.error }} error>
                {/* {error} */}
              </FormHelperText>
            </div>
          </div>
          <Button
            classes={{ root: styles.button }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Update restaurant's data
          </Button>
        </form>
      </div>
    </div>
  );
}
