const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const middlewares = require("./middlewares");

router.post("/addlunch/offert", middlewares.auth, function (req, res, next) {
  const {
    email,
    soupPrice,
    dishPrice,
    drinkPrice,
    setPrice,
    setAndDrinkPrice,
    date,
  } = req.body;

  let soupPr, drinkPr, setPr, setAndDrinkPr;

  const errors = {};

  if (!dishPrice) {
    errors.message = "Dish price is required!";
  }
  if (!date) {
    errors.message = "Date is required!";
  }
  if (Object.keys(errors).length !== 0) {
    return res.status(422).send(errors);
  }

  soupPrice === undefined ? (soupPr = "0") : (soupPr = soupPrice);
  drinkPrice === undefined ? (drinkPr = "0") : (drinkPr = drinkPrice);
  setPrice === undefined ? (setPr = "0") : (setPr = setPrice);
  setAndDrinkPrice === undefined
    ? (setAndDrinkPr = "0")
    : (setAndDrinkPr = setAndDrinkPrice);

  let sql = `  INSERT INTO Lunch_offerts (Restaurant_Id, Date, Soup_price, Dish_price, Set_price, Set_and_drink_price) 
                  VALUES ((select Restaurants.Restaurant_Id from Accounts left join Restaurants on Accounts.Account_id = Restaurants.Account_id where Accounts.Email='${email}'), '${date}', '${soupPr}','${dishPrice}','${setPr}','${setAndDrinkPr}'); `;

  req.app.database.query(sql, function (err, result) {
    if (err && err.code === "ER_DUP_ENTRY") {
      return res.status(409).send({ message: "Lunch already exists!" });
    }
    console.log("1 record inserted into Lunch_offerts", result.insertId);
    res.status(201).send({ insertId: result.insertId });
  });
});

router.post("/addlunch/component", middlewares.auth, function (req, res, next) {
  const { email, soupsTable, dishTable, drinksTable } = req.body;

  if (soupsTable[0] === "a") soupsTable[0] = "";
  if (drinksTable[0] === "a") drinksTable[0] = "";

  const errors = {};

  if (dishTable[0] === "a") {
    errors.message = "At least one dish is required!";
  }
  if (Object.keys(errors).length !== 0) {
    return res.status(422).send(errors);
  }
  let sql_help = `( select Lunch_offerts.Lunch_id as Lunch_id from Accounts left join Restaurants on Accounts.Account_id = Restaurants.Account_id 
      left join Lunch_offerts on Lunch_offerts.Restaurant_Id=Restaurants.Restaurant_Id
      where Lunch_offerts.Lunch_id is NOT null
      and Accounts.Email='${email}')`;

  req.app.database.query(sql_help, function (err, result) {
    if (err && err.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .send({ message: "Lunch component already exists!" });
    }

    const components_counter =
      soupsTable.length + dishTable.length + drinksTable.length;
    let component = [];
    let values = [];

    for (let i = 0; i < components_counter; i++) {
      if (i < soupsTable.length) {
        component = [result[0].Lunch_id, "Soup", soupsTable[i]];
      } else if (i - soupsTable.length < dishTable.length) {
        component = [
          result[0].Lunch_id,
          "Dish",
          dishTable[i - soupsTable.length],
        ];
      } else if (
        i - (soupsTable.length + dishTable.length) <
        drinksTable.length
      ) {
        component = [
          result[0].Lunch_id,
          "Drink",
          drinksTable[i - (soupsTable.length + dishTable.length)],
        ];
      }

      if (component[2] !== "") values.push(component);
    }
    console.log(values);

    let sql2 = ` INSERT INTO Lunch_components (Lunch_id, Component_type, Component_name)
                  VALUES ?`;

    req.app.database.query(sql2, [values], function (err, result) {
      if (err && err.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .send({ message: "Lunch component already exists!" });
      }

      console.log("1 record inserted into Lunch_components", result.insertId);
      res.status(201).send({ insertId: result.insertId });
    });
  });
});

router.get("/offerts", middlewares.auth, function (req, res, next) {
  // console.log(req.query.email)

  const sql = ` SELECT 
                    Lunch_offerts.Date, 
                    Lunch_offerts.Soup_price, 
                    Lunch_offerts.Dish_price, 
                    Lunch_offerts.Set_price, 
                    Lunch_offerts.Set_and_drink_price,
                    Lunch_components.Component_type,
                    Lunch_components.Component_name
                FROM Accounts LEFT JOIN Restaurants ON Accounts.Account_id = Restaurants.Account_id
                        LEFT JOIN Lunch_offerts ON Restaurants.Restaurant_Id = Lunch_offerts.Restaurant_Id
                        LEFT JOIN Lunch_components ON Lunch_offerts.Lunch_id = Lunch_components.Lunch_id
                WHERE Accounts.email = '${req.query.email}'; `;

  req.app.database.query(sql, (err, results, fields) => {
    console.log(results);
    if (results[0] === undefined) {
      console.log("The email doesnt exist!");
      return res.status(400).send({ message: "The email doesnt exist!" });
    }

    // const newArray = results.every(element =>element.Component_type)
    // console.log(newArray)

    res.status(200).send({
      date: results[0].Date,
      soupPrice: results[0].Soup_price,
      dishPrice: results[0].Dish_price,
      setPrice: results[0].Set_price,
      setAndDrinkPrice: results[0].Set_and_drink_price,
      componentType: results.Component_type,
      componentName: results[0].Component_name,
    });
  });
});

module.exports = router;
