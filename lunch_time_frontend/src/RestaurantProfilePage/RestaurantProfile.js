import React, { useEffect, useState, useContext } from "react";
import styles from "./RestaurantProfile.module.css";
import UserContext from "../userContext";
import Button from "@material-ui/core/Button";
const QRCode = require('qrcode.react')


export default function RestaurantProfile() {
  const userContext = useContext(UserContext);
  const [name, setName] = useState();
  const [accountId, setAccountId] = useState();
  const [address, setAddress] = useState();
  const [lunch_start_time, setLunch_start_time] = useState();
  const [lunch_end_time, setLunch_end_time] = useState();
  const [soupPrice, setSoupPrice] = useState();
  const [dishPrice, setDishPrice] = useState();
  const [setPrice, setSetPrice] = useState();
  const [setAndDrinkPrice, setSetAndDrinkPrice] = useState();
  const [website_address, setWebsite_address] = useState();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    fetch(
      "http://localhost:4000/accounts/restaurantprofile" +
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

        return response.json();
      })
      .then((json) => {
        setAccountId(json.account_id)
        setName(json.name);
        setAddress(json.address);
        setLunch_start_time(json.lunch_start_time);
        setLunch_end_time(json.lunch_end_time);
        json.soup_price === 0
          ? setSoupPrice("indefine")
          : setSoupPrice(json.soup_price);
        setDishPrice(json.dish_price);
        json.set_price === 0
          ? setSetPrice("indefine")
          : setSetPrice(json.set_price);
        json.set_and_drink_price === 0
          ? setSetAndDrinkPrice("indefine")
          : setSetAndDrinkPrice(json.set_and_drink_price);
        setWebsite_address(json.website_address);
        // console.log("json", json);
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <div className={styles.Login}>
      <div className={styles.container}>
        <h1 className={styles.title}>Restaurant</h1>
        <QRCode className={styles.Code} value={userContext.user.email+','+accountId} />
        <div className={styles.ResData}>
          <a>name: {name}</a>
          <br></br>
          <a>email: {userContext.user.email}</a>
          <br></br>
          <a>address: {address}</a>
          <br></br>
          <a>lunch start time: {lunch_start_time}</a>
          <br></br>
          <a>lunch end time: {lunch_end_time}</a>
          <br></br>
          <a>soup price: {soupPrice}zł</a>
          <br></br>
          <a>dish price: {dishPrice}zł</a>
          <br></br>
          <a>set price: {setPrice}zł</a>
          <br></br>
          <a>set and drink price: {setAndDrinkPrice}zł</a>
          <br></br>
          <a>website address: {website_address}</a>
          <br></br>
        </div>
        <Button
          classes={{ root: styles.button }}
          variant="contained"
          color="primary"
          href="/restaurantupdatedata"
        >
          Change information about your restaurant
        </Button>
      </div>
    </div>
  );
}
