import React, { useEffect, useState, useContext, Fragment } from "react";
import styles from "./Home.module.css";
import UserContext from "../userContext";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import picture from "../lunchenadzis.png";
import mapicon from "../map_icon.png";
import filtericon from "../filter_icon.png";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styless = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styless)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


export default function Home() {
  const userContext = useContext(UserContext);
  const history = useHistory();
  const [helpOffertsArray, setHelpOffertsArray] = useState({});
  const [helpLunchArray, setHelpLunchArray] = useState([]);
  const [open, setOpen] = useState(false);
  const [lunchOffertsArray, setLunchOffertsArray] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [restaurantName, setRestaurantName] = useState();
  const [setPrice, setSetPrice] = useState();
  const [soupPrice, setSoupPrice] = useState();
  const [dishPrice, setDishPrice] = useState();
  const [setAndDrinkPrice, setSetAndDrinkPrice] = useState();

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
        arrayService(json.allOffertsArray);
      })
      .catch((err) => console.log("err", err));
  };

  const arrayService = (allOffertsArray) => {
    const newTable = Object.entries(allOffertsArray);
    const valTab = newTable.map((element, index) => element[1][0]);

    const sortTable = valTab.sort((a, b) =>
      a.date
        .split("/")
        .reverse()
        .join()
        .localeCompare(b.date.split("/").reverse().join())
    );

    setLunchOffertsArray(sortTable);
    setHelpOffertsArray(sortTable);
  };

  const imgClick = (event) => {
    if (event.target.name === "mapicon") history.push("/mappage");
    if (event.target.name === "filtericon" && !isFilter) {
      setIsFilter(true);
      let today = new Date();
      const date =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear().toString()[2] +
        today.getFullYear().toString()[3];

      let todayLunchOfferts = [];
      lunchOffertsArray.map((element, index) => {
        if (element.date === date) todayLunchOfferts.push(element);
      });
      setLunchOffertsArray(todayLunchOfferts);
    }
    if (event.target.name === "filtericon" && !!isFilter) {
      setIsFilter(false);
      setLunchOffertsArray(helpOffertsArray);
    }
  };

  const paperClick = (offert) => {
    setOpen(true);
    setRestaurantName(offert.name);
    setSetPrice(offert.set_price);
    fetchAllLunchComponents(offert);
  };

  const fetchAllLunchComponents = (offert) => {
    fetch(
      "http://localhost:4000/restaurant/all_lunch_components" +
        `?date=${offert.date}` +
        `&name=${offert.name}`,
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
        setSoupPrice(json.soupPrice);
        setDishPrice(json.dishPrice);
        setSetAndDrinkPrice(json.setAndDrinkPrice);

        dialogArrayService(json.allOffertsArray);
      })
      .catch((err) => console.log("err", err));
  };

  const dialogArrayService = (allOffertsArray) => {
    const newTable = Object.entries(allOffertsArray);

    const valuestable = newTable.map((element, index) => [
      element[1].map((e, i) => [e.type, e.name]),
    ]);

    const tab = valuestable.map((e, i) => e[0]);

    setHelpLunchArray(tab[0]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.bigBox}>
      <div className={styles.Box}>
        <img className={styles.Picture} src={picture} alt="Title" />
        <div className={styles.Icons}>
          <img
            className={styles.MapIcon}
            name="mapicon"
            src={mapicon}
            alt="mapicon"
            onClick={imgClick}
          />
          <img
            className={styles.MapIcon}
            name="filtericon"
            src={filtericon}
            alt="filtericon"
            onClick={imgClick}
          />
        </div>
        <div className={styles.container}>
          {lunchOffertsArray.map((offert, index) => (
            <Fragment>
              <div
                className={styles.Root}
                key={index}
                onClick={() => paperClick(offert)}
              >
                <Paper className={styles.Paper} style={{ cursor: "pointer" }}>
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
                                {offert.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                className={styles.Text}
                              >
                                {offert.lunch_start_time} -{" "}
                                {offert.lunch_end_time}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                className={styles.Text}
                              >
                                Set price: {offert.set_price}
                              </Typography>
                            </div>
                            <div className={styles.PaperRight}>
                              <Grid item>
                                <Typography variant="body2">
                                  {offert.date}
                                </Typography>
                              </Grid>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            </Fragment>
          ))}
          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <div className={styles.DialogContainer}>
              <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                {restaurantName}
              </DialogTitle>
              <DialogContent dividers>
                <Typography gutterBottom>ZUPY:</Typography>
                {helpLunchArray.map((e, i) =>
                  e[0] === "Soup" ? (
                    <Typography className={styles.DishesNames} gutterBottom>{e[1]}</Typography>
                  ) : (
                    <Fragment></Fragment>
                  )
                )}
                <Typography gutterBottom>DANIA GŁÓWNE:</Typography>
                {helpLunchArray.map((e, i) =>
                  e[0] === "Dish" ? (
                    <Typography className={styles.DishesNames} gutterBottom>{e[1]}</Typography>
                  ) : (
                    <Fragment></Fragment>
                  )
                )}
                <Typography gutterBottom>DRINKS:</Typography>
                {helpLunchArray.map((e, i) =>
                  e[0] === "Drink" ? (
                    <Typography className={styles.DishesNames} gutterBottom>{e[1]}</Typography>
                  ) : (
                    <Fragment></Fragment>
                  )
                )}
                <Typography gutterBottom color="textSecondary">
                  SOUP PRICE: {soupPrice}ZŁ
                </Typography>
                <Typography gutterBottom color="textSecondary">
                  DISH PRICE: {dishPrice}ZŁ
                </Typography>
                <Typography gutterBottom color="textSecondary">
                  SET PRICE: {setPrice}ZŁ
                </Typography>
                <Typography gutterBottom color="textSecondary">
                  SET + DRINK PRICE: {setAndDrinkPrice}ZŁ
                </Typography>
              </DialogContent>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
