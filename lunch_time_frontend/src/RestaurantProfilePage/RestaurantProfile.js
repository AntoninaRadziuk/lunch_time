import React, { useEffect, useState, useContext } from "react";
import styles from "./RestaurantProfile.module.css";
import UserContext from "../userContext";

export default function RestaurantProfile() {
  const userContext = useContext(UserContext);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [lunch_start_time, setLunch_start_time] = useState();
  const [lunch_end_time, setLunch_end_time] = useState();
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
        setName(json.name);
        setAddress(json.address);
        setLunch_start_time(json.lunch_start_time);
        setLunch_end_time(json.lunch_end_time);
        setWebsite_address(json.website_address);
        // console.log("json", json);
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <div className={styles.Login}>
      <div className={styles.container}>
        <h1 className={styles.title}>Restaurant</h1>
        <a>name: {name}</a><br></br>
        <a>email: {userContext.user.email}</a><br></br>
        <a>address: {address}</a><br></br>
        <a>lunch start time: {lunch_start_time}</a><br></br>
        <a>lunch end time: {lunch_end_time}</a><br></br>
        <a>website address: {website_address}</a><br></br>
      </div>
    </div>
  );
}
