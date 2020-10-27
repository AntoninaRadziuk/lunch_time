import React, { useEffect, useState, useContext, Fragment } from "react";
import styles from "./HomeRestaurant.module.css";
import UserContext from "../userContext";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import picture from "../lunchenadzis.png";


export default function HomeRestaurant() {
  const userContext = useContext(UserContext);
  const [allOffertsArray, setAllOffertsArray] = useState({});

  useEffect(() => {
    fetchAllOfferts();
  }, []);

  const fetchAllOfferts = () => {
    fetch("http://localhost:4000/restaurant/all_offerts", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: userContext.user.token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setAllOffertsArray(json.allOffertsArray);
      })
      .catch((err) => console.log("err", err));
  };

  const newTable = Object.entries(allOffertsArray);
  const valTab = newTable.map((element, index) => element[1][0]);

  const sortTable = valTab.sort((a, b) =>
    a.date
      .split("/")
      .reverse()
      .join()
      .localeCompare(b.date.split("/").reverse().join())
  );
  console.log(sortTable);

  // const valuestable = newTable.map((element, index) => [
  //   element[1].map((e, i) => [
  //     e.date,
  //     e.name,
  //     e.lunch_start_time,
  //     e.lunch_end_time,
  //     e.set_price,
  //   ]),
  // ]);

  // const tab = valuestable.map((e, i) => e[0]);
  // tab.map((element, index) => console.log(element[0]));

  return (
    <div className={styles.bigBox}>
      <div className={styles.Box}>
      <img className={styles.Picture} src={picture} alt="Logo" />
        {/* <h1 className={styles.title}>Lunche na dziś</h1> */}
        <div className={styles.container}>
          {sortTable.map((e, index) => (
            <div className={styles.Root} key={index}>
              <Paper className={styles.Paper}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <div className={styles.PaperContainer}>
                          <div className={styles.PaperLeft}>
                            <Typography
                              variant="subtitle1"
                              className={styles.Text}
                            >
                              {e.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              className={styles.Text}
                            >
                              {e.lunch_start_time} - {e.lunch_end_time}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              className={styles.Text}
                            >
                              Set price: {e.set_price}
                            </Typography>
                          </div>
                          <div className={styles.PaperRight}>
                            <Grid item>
                              <Typography variant="body2">{e.date}</Typography>
                            </Grid>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
