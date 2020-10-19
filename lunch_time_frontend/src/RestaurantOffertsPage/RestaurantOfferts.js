import React, { useEffect, useState, useContext, Fragment } from "react";
import styles from "./RestaurantOfferts.module.css";
import UserContext from "../userContext";
import { useHistory } from "react-router-dom";

export default function RestaurantOfferts() {
  const userContext = useContext(UserContext);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [lunch_start_time, setLunch_start_time] = useState();
  const [lunch_end_time, setLunch_end_time] = useState();
  const [website_address, setWebsite_address] = useState();
  const [soupPrice, setSoupPrice] = useState();
  const [soupTable, setSoupsTable] = useState(["zurek", "rosół"]);
  const [dishPrice, setDishPrice] = useState();
  const [dishTable, setDishTable] = useState(['schabowy', 'jaja']);
  const [drinkPrice, setDrinkPrice] = useState();
  const [drinkTable, setDrinkTable] = useState(["1", "2", "3"]);
  const [setPrice, setSetPrice] = useState();
  const [setAndDrinkPrice, setSetAndDrinkPrice] = useState();
  const [date, setDate] = useState();
  const [dateTable, setDateTable] = useState(['01/01/10', '02/02/02', '03/03/03']);
  const history = useHistory();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    fetch(
      "http://localhost:4000/restaurant/offerts" +
        `?email=${userContext.user.email}`,
      {
        method: "GET",
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
        setName(json.name);
        setDate(json.date);
        setSoupPrice(json.soupPrice);
        setDishPrice(json.dishPrice);
        setSetPrice(json.setPrice);
        setSetAndDrinkPrice(json.setAndDrinkPrice);
        console.log(json.componentType);
        // setAddress(json.address);
        // setLunch_start_time(json.lunch_start_time);
        // setLunch_end_time(json.lunch_end_time);
        // setWebsite_address(json.website_address);
        console.log("json", json);
        // history.push('/afteraddlunch')
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <div className={styles.Login}>
      <div className={styles.container}>
        <h1 className={styles.title}>Restaurant</h1>
        <a>name: {name}</a>
        <br></br>
        <a>Data: {date}</a>
        <br></br>
        <a>Soup price: {soupPrice}</a>
        <br></br>
        <a>Dish price: {dishPrice}</a>
        <br></br>
        <a>Drink price: {drinkPrice}</a>
        <br></br>
        <a>Set price: {setPrice}</a>
        <br></br>
        <a>Set and drink price: {setAndDrinkPrice}</a>
        <br></br>
        {dateTable.map((elementDate, indexDate) => (
          <Fragment key={indexDate}>
            <a>Data: {elementDate}</a>
            <a>Soups:</a>
            <br></br>
            {soupTable.map((elementSoup, indexSoup) => (
              <Fragment key={indexSoup}>
                <a>{elementSoup}</a>
                <br></br>
              </Fragment>
            ))}
            <a>Dishes:</a>
            <br></br>
            {dishTable.map((elementDish, indexDish) => (
              <Fragment key={indexDish}>
                <a>{elementDish}</a>
                <br></br>
              </Fragment>
            ))}
            <a>Drinks:</a>
            <br></br>
            {drinkTable.map((elementDrink, indexDrink) => (
              <Fragment key={indexDrink}>
                <a>{elementDrink}</a>
                <br></br>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
