const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const middlewares = require("./middlewares");

router.get("/offerts", middlewares.auth, function (req, res, next) {

  const sql = ` SELECT 
                    Lunch_offerts.Date, 
                    Restaurants.Soup_price, 
                    Restaurants.Dish_price, 
                    Restaurants.Set_price, 
                    Restaurants.Set_and_drink_price,
                    Lunch_components.Component_type,
                    Lunch_components.Component_name
                FROM Accounts LEFT JOIN Restaurants ON Accounts.Account_id = Restaurants.Account_id
                        LEFT JOIN Lunch_offerts ON Restaurants.Restaurant_Id = Lunch_offerts.Restaurant_Id
                        LEFT JOIN Lunch_components ON Lunch_offerts.Date = Lunch_components.Date
                WHERE Accounts.email = '${req.query.email}'; `;

  req.app.database.query(sql, (err, results, fields) => {
    if (!results) {
      console.log("The email doesnt exist!");
      return res.status(400).send({ message: "The email doesnt exist!" });
    }

    const newArray = results.map((element) => [
      element.Date,
      element.Component_type,
      element.Component_name,
    ]);

    const offertsArray = newArray.reduce(function (prevValue, currentValue) {
      const date = currentValue[0];

      if (!prevValue[date]) {
        return {
          ...prevValue,
          [date]: [
            {
              type: currentValue[1],
              name: currentValue[2],
            },
          ],
        };
      }

      prevValue[date].push({
        type: currentValue[1],
        name: currentValue[2],
      });

      return prevValue;
    }, []);

    console.log(offertsArray);

    res.status(200).send({
      offertsArray: offertsArray
      // componentType: results.Component_type,
      // componentName: results[0].Component_name,
    });
  });
});

router.post("/addlunch/offert", middlewares.auth, function (req, res, next) {
  const { email, date, soupsTable, dishTable, drinksTable } = req.body;

  const errors = {};

  if (!date) {
    errors.date = "Date is required!";
  }
  if (soupsTable[0] === "a") soupsTable[0] = "";
  if (drinksTable[0] === "a") drinksTable[0] = "";
  if (dishTable[0] === "a") {
    errors.dish = "At least one dish is required!";
  }
  if (Object.keys(errors).length !== 0) {
    console.log(errors);
    return res.status(422).send(errors);
  }

  let sql = `  INSERT INTO Lunch_offerts (Restaurant_Id, Date) 
                  VALUES ((select Restaurants.Restaurant_Id from Accounts left join Restaurants on Accounts.Account_id = Restaurants.Account_id where Accounts.Email='${email}'), '${date}'); `;

  req.app.database.query(sql, function (err, result) {
    if (err && err.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .send({ message: "Lunch on that date already exists!" });
    }
    console.log("1 record inserted into Lunch_offerts", result.insertId);

    // let sql_help = `( select Lunch_offerts.Date as Date from Lunch_offerts where
    // from Accounts left join Restaurants on Accounts.Account_id = Restaurants.Account_id
    //               left join Lunch_offerts on Lunch_offerts.Restaurant_Id=Restaurants.Restaurant_Id
    // where Lunch_offerts.Date is NOT null
    //       and Accounts.Email='${email}')`;

    // req.app.database.query(sql_help, function (err, result) {
    //   if (err && err.code === "ER_DUP_ENTRY") {
    //     return res
    //       .status(409)
    //       .send({ message: "Lunch component already exists!" });
    //   }

    const components_counter =
      soupsTable.length + dishTable.length + drinksTable.length;
    let component = [];
    let values = [];

    for (let i = 0; i < components_counter; i++) {
      if (i < soupsTable.length) {
        component = [date, "Soup", soupsTable[i]];
      } else if (i - soupsTable.length < dishTable.length) {
        component = [date, "Dish", dishTable[i - soupsTable.length]];
      } else if (
        i - (soupsTable.length + dishTable.length) <
        drinksTable.length
      ) {
        component = [
          date,
          "Drink",
          drinksTable[i - (soupsTable.length + dishTable.length)],
        ];
      }

      if (component[2] !== "") values.push(component);
    }
    console.log(values);

    let sql2 = ` INSERT INTO Lunch_components (Date, Component_type, Component_name)
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

module.exports = router;
