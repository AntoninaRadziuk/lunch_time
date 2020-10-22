import React, { useEffect, useState, useContext, Fragment } from "react";
import styles from "./RestaurantOfferts.module.css";
import UserContext from "../userContext";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

export default function RestaurantOfferts() {
  const userContext = useContext(UserContext);
  const [offertsArray, setOffertsArray] = useState({});

  useEffect(() => {
    fetchOfferts();
  }, []);

  const fetchOfferts = () => {
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
        return response.json();
      })
      .then((json) => {
        setOffertsArray(json.offertsArray);
      })
      .catch((err) => console.log("err", err));
  };

  const newTable = Object.entries(offertsArray);
  const datesTable = newTable.map((element, index) => element[0]);
  let sortedDates = datesTable
    // .sort((a, b) =>
    //   a.split("/").reverse().join().localeCompare(b.split("/").reverse().join())
    // )
    // .reverse();

  const valuestable = newTable.map((element, index) => [
    element[1].map((e, i) => [e.type, e.name]),
  ]);

  const tab = valuestable.map((e, i) => e[0]);
  tab.map((element, index) => console.log(element[0]));

  return (
    <div className={styles.bigBox}>
      <div className={styles.container}>
        <h1 className={styles.title}>Restaurant</h1>
        {sortedDates.map((element, index) => (
          <div className={styles.Root} key={index}>
            <Paper className={styles.Paper}>
              <Grid container spacing={2}>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      className={styles.Text}
                    >
                      {element}
                    </Typography>
                    {tab[index].map((e, i) =>
                      e[0] === "Soup" ? (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          className={styles.Text}
                        >
                          soups: {e[1]}
                        </Typography>
                      ) : e[0] === "Dish" ? (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          key={i}
                          className={styles.Text}
                        >
                          dishes: {e[1]}
                        </Typography>
                      ) : e[0] === "Drink" ? (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          className={styles.Text}
                        >
                          drinks: {e[1]}
                        </Typography>
                      ) : (
                        <Fragment></Fragment>
                      )
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        ))}
      </div>
    </div>
  );
}
