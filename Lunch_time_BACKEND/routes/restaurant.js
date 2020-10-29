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
      offertsArray: offertsArray,
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

router.get("/all_offerts", middlewares.auth, function (req, res, next) {
  const sql = ` SELECT 
                  Lunch_offerts.Date, 
                  Restaurants.Name, 
                  Restaurants.Lunch_start_time, 
                  Restaurants.Lunch_end_time, 
                  Restaurants.Set_price
                FROM Restaurants LEFT JOIN Lunch_offerts ON Restaurants.Restaurant_Id = Lunch_offerts.Restaurant_Id
                WHERE Lunch_offerts.Date is not null; `;

  req.app.database.query(sql, (err, results, fields) => {
    if (!results) {
      console.log("The email doesnt exist!");
      return res.status(400).send({ message: "The email doesnt exist!" });
    }

    const newArray = results.map((element) => [
      element.Date,
      element.Name,
      element.Lunch_start_time,
      element.Lunch_end_time,
      element.Set_price,
    ]);

    const offertsArray = newArray.reduce(function (prevValue, currentValue) {
      const date = currentValue[0] + currentValue[1];

      if (!prevValue[date]) {
        return {
          ...prevValue,
          [date]: [
            {
              date: currentValue[0],
              name: currentValue[1],
              lunch_start_time: currentValue[2],
              lunch_end_time: currentValue[3],
              set_price: currentValue[4],
            },
          ],
        };
      }

      prevValue[date].push({
        date: currentValue[0],
        name: currentValue[1],
        lunch_start_time: currentValue[2],
        lunch_end_time: currentValue[3],
        set_price: currentValue[4],
      });

      return prevValue;
    }, []);

    console.log(offertsArray);

    res.status(200).send({
      allOffertsArray: offertsArray,
    });
  });
});

router.get("/all_lunch_components", middlewares.auth, function (
  req,
  res,
  next
) {
  console.log("date", req.query.date, "name", req.query.name);
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
                WHERE Restaurants.name = '${req.query.name}' AND Lunch_offerts.Date = '${req.query.date}'`;

  req.app.database.query(sql, (err, results, fields) => {
    if (!results) {
      console.log("The lunch offert doesnt exist!");
      return res
        .status(400)
        .send({ message: "The lunch offert doesnt exist!" });
    }

    console.log(results[0].Soup_price);

    const newArray = results.map((element) => [
      element.Date,
      // element.Soup_price,
      // element.Dish_price,
      // element.Set_and_drink_price,
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
      allOffertsArray: offertsArray,
      soupPrice: results[0].Soup_price,
      dishPrice: results[0].Dish_price,
      setPrice: results[0].Set_price,
      setAndDrinkPrice: results[0].Set_and_drink_price,
      date: results[0].Date,
    });
  });
});

router.get("/startupdatedata", middlewares.auth, function (req, res, next) {
  const data = {};

  let sql = ` SELECT 
	                Restaurants.Name, 
                  Restaurants.Lunch_start_time, 
                  Restaurants.Lunch_end_time,  
                  Restaurants.Soup_price,
                  Restaurants.Dish_price,
                  Restaurants.Set_price,
                  Restaurants.Set_and_drink_price,
                  Restaurants.Address,
                  Restaurants.Website_address
                FROM Restaurants LEFT JOIN Accounts ON Restaurants.Account_id = Accounts.Account_id
                WHERE Accounts.Email = '${req.query.email}';`;

  req.app.database.query(sql, function (err, result) {
    // console.log("1 record inserted into Restaurants", result.insertId);
    if (!result) {
      console.log("The restaurant doesnt exist!");
      return result
        .status(400)
        .send({ message: "The restaurant doesnt exist!" });
    }

    data.email = req.query.email;
    data.name = result[0].Name;
    data.lunchStartTime = result[0].Lunch_start_time;
    data.lunchEndTime = result[0].Lunch_end_time;
    data.soupPrice = result[0].Soup_price;
    data.dishPrice = result[0].Dish_price;
    data.setPrice = result[0].Set_price;
    data.setAndDrinkPrice = result[0].Set_and_drink_price;
    data.address = result[0].Address;
    data.websiteAddress = result[0].Website_address;

    res.status(201).send({
      data,
    });
  });
});

module.exports = router;
