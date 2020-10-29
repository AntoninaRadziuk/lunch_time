const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const middlewares = require("./middlewares");

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   let sql = "select * from Accounts";
//   req.app.database.query(sql, (err, results, fields) => {
//     console.log(results, err, fields);
//   });
//   res.send("respond with a resource");
// });

router.post("/login", function (req, res, next) {
  const { email, password } = req.body;
  const errors = {};

  if (!email || !password) {
    errors.email = "Complete two fields!";
  }

  if (Object.keys(errors).length !== 0) {
    return res.status(422).send(errors);
  }

  sql = `SELECT email, password, account_Type FROM Accounts WHERE email = '${email}';`;

  req.app.database.query(sql, function (err, result) {
    if (result[0] === undefined) {
      console.log("Wrong email!");
      return res.status(400).send({ email: "Wrong email or password!" });
    }

    req.app.database.query(sql, function (err, result) {
      if (!bcrypt.compareSync(password, result[0].password)) {
        console.log("Wrong password!");
        return res.status(400).send({ email: "Wrong email or password!" });
      }

      const token = jwt.sign(
        {
          email: email,
        },
        "myPrivateKey",
        { expiresIn: "1h" }
      );

      res
        .status(200)
        .send({ token: token, account_type: result[0].account_Type });
    });
  });
});

router.post("/register/user", function (req, res, next) {
  const { email, password, passwordConfirm } = req.body;
  const errors = {};

  if (!password) {
    errors.password = "Password is required!";
  } else if (password.length < 8) {
    errors.password = "Password must have at least 8 characters!";
  } else if (password !== passwordConfirm) {
    errors.password = "Confirm password!";
  }

  //empty object
  if (Object.keys(errors).length !== 0) {
    return res.status(422).send(errors);
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  let sql1 = ` INSERT INTO Accounts (email, password, account_type) VALUES ('${email}', '${hash}', 'Client');`;

  req.app.database.query(sql1, function (err, result) {
    if (err && err.code === "ER_DUP_ENTRY") {
      return res.status(409).send({ email: "Email already exists!" });
    }
    console.log("1 record inserted into Accounts", result.insertId);

    let sql2 = `INSERT INTO Clients (Account_id) VALUES (( SELECT Account_id FROM Accounts WHERE email = '${email}'))`;

    req.app.database.query(sql2, function (err, result) {
      // console.log(err, result);
      console.log("1 record inserted into Clients", result.insertId);
      res.status(201).send({ email: email });
    });
  });
});

router.post("/register/restaurant", function (req, res, next) {
  const {
    email,
    password,
    passwordConfirm,
    restaurantName,
    restaurantAddress,
    lunchTimeStart,
    lunchTimeEnd,
    soupPrice,
    dishPrice,
    setPrice,
    setAndDrinkPrice,
    websiteAddress,
  } = req.body;

  const errors = {};
  let soupPr, drinkPr, setPr, setAndDrinkPr;

  if (!password) {
    errors.password = "Password is required!";
  } else if (password.length < 8) {
    errors.password = "Password must have at least 8 characters!";
  } else if (password !== passwordConfirm) {
    errors.password = "Confirm password!";
  }

  if (!restaurantName) {
    errors.restaurantName = "Restaurant name is required!";
  }

  if (!restaurantAddress) {
    errors.restaurantAddress = "Restaurant address is required!";
  }

  if (!lunchTimeStart) {
    errors.lunchTimeStart = "Restaurant lunch start is required!";
  }

  if (!lunchTimeEnd) {
    errors.lunchTimeEnd = "Restaurant lunch end is required!";
  }

  if (!dishPrice) {
    errors.dishPrice = "Dish price is required!";
  }

  !soupPrice ? (soupPr = "0") : (soupPr = soupPrice);
  !setPrice ? (setPr = "0") : (setPr = setPrice);
  !setAndDrinkPrice
    ? (setAndDrinkPr = "0")
    : (setAndDrinkPr = setAndDrinkPrice);

  //empty object
  if (Object.keys(errors).length !== 0) {
    return res.status(422).send(errors);
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  let sql1 = ` INSERT INTO Accounts (email, password, account_type) VALUES ('${email}', '${hash}', 'Restaurant');`;

  req.app.database.query(sql1, function (err, result) {
    if (err && err.code === "ER_DUP_ENTRY") {
      return res.status(409).send({ email: "Email already exists!" });
    }
    console.log("1 record inserted into Accounts", result.insertId);

    let sql2 = ` INSERT INTO Restaurants (Account_id, name, address, lunch_start_time, lunch_end_time, Soup_price, Dish_price, Set_price, Set_and_drink_price, website_address) 
                VALUES (
                  (select Account_id from Accounts where Email='${email}'), 
                  '${restaurantName}', '${restaurantAddress}', '${lunchTimeStart}', '${lunchTimeEnd}', '${soupPr}', '${dishPrice}', '${setPr}', '${setAndDrinkPr}', '${websiteAddress}')`;

    req.app.database.query(sql2, function (err, result) {
      console.log("1 record inserted into Restaurants", result.insertId);
      res.status(201).send({ email: email });
    });
  });
});

router.get("/clientprofile", middlewares.auth, function (req, res, next) {
  // console.log(req.query.email)

  const sql = ` SELECT account_type, email, stamps_counter 
                FROM Accounts left join Clients on Accounts.Account_id = Clients.Account_id
                WHERE Accounts.email = '${req.query.email}'; `;

  req.app.database.query(sql, (err, results, fields) => {
    console.log(results);
    if (results[0] === undefined) {
      console.log("The email doesnt exist!");
      return res.status(400).send({ message: "The email doesnt exist!" });
    }
    res.status(200).send({
      account_type: results[0].account_type,
      email: results[0].email,
      stamps_counter: results[0].stamps_counter,
    });
  });
});

router.get("/restaurantprofile", middlewares.auth, function (req, res, next) {
  // console.log(req.query.email)

  const sql = ` SELECT Accounts.account_id, account_type, email, name, address, Lunch_start_time, Lunch_end_time, Soup_price, Dish_price, Set_price, Set_and_drink_price, Website_address 
                FROM Accounts left join Restaurants on Accounts.Account_id = Restaurants.Account_id
                WHERE Accounts.email = '${req.query.email}'; `;

  req.app.database.query(sql, (err, results, fields) => {
    console.log(results);
    if (results[0] === undefined) {
      console.log("The email doesnt exist!");
      return res.status(400).send({ message: "The email doesnt exist!" });
    }
    res.status(200).send({
      account_id: results[0].account_id,
      account_type: results[0].account_type,
      email: results[0].email,
      name: results[0].name,
      address: results[0].address,
      lunch_start_time: results[0].Lunch_start_time,
      lunch_end_time: results[0].Lunch_end_time,
      soup_price: results[0].Soup_price,
      dish_price: results[0].Dish_price,
      set_price: results[0].Set_price,
      set_and_drink_price: results[0].Set_and_drink_price,
      website_address: results[0].Website_address,
    });
  });
});

router.post("/stampsCounter", middlewares.auth, function (req, res, next) {
  const { email, result } = req.body;

  const index = result.indexOf(",");
  const restaurantEmail = result.slice(0, index);
  const restaurantId = result.slice(index + 1, result.length);

  console.log(restaurantEmail, restaurantId);

  const sql = ` SELECT Accounts.Account_id 
                FROM Accounts 
                WHERE Accounts.Email = '${restaurantEmail}' AND Accounts.Account_id = '${restaurantId}'`;

  req.app.database.query(sql, (err, results) => {
    if (results[0] === undefined) {
      console.log("The account doesnt exist!");
      return res.status(400).send({ message: "The email doesnt exist!" });
    }

    const sql1 = `UPDATE Accounts LEFT JOIN Clients ON Accounts.Account_id = Clients.Account_id
                  SET Stamps_counter = Stamps_counter + 1 
                  WHERE Accounts.Email = '${email}';`;

    req.app.database.query(sql1, (err, re) => {
      const sql2 = `SELECT count(*) AS licznik
                    FROM Accounts LEFT JOIN Clients ON Accounts.Account_id = Clients.Account_id
                                  LEFT JOIN Stamps ON Clients.Client_id = Stamps.Client_id
                    WHERE DATE_FORMAT(Stamp_date, "%Y-%c-%d") = DATE_FORMAT(now(), "%Y-%c-%d")
                          AND Accounts.Email = '${email}';`;

      req.app.database.query(sql2, (err, r) => {
        console.log("licznik", r[0].licznik);

        if (r[0].licznik === 0) {
          const sql3 = `INSERT INTO Stamps (Client_id) VALUES ((SELECT Client_id FROM Accounts LEFT JOIN Clients ON
                        Accounts.Account_id = Clients.Account_id WHERE Accounts.Email = '${email}'));`;

          req.app.database.query(sql3, (err, result) => {
            if (err && err.code === "ER_DUP_ENTRY") {
              return res.status(409).send({ email: "Date already exists!" });
            }
            console.log("1 record inserted into Stamps", result.insertId);
            res.status(200).send({
              account_id: results[0].Account_id,
            });
          });
        } else {
          return res
            .status(409)
            .send({
              message: "You cant get the stamp, because date already exists!",
            });
        }
      });
    });
  });
});

router.post("/cleanStamps", middlewares.auth, function (req, res, next) {
  console.log("jestem!!!!!!");
  const { email } = req.body;

  const sql = `UPDATE Accounts LEFT JOIN Clients ON Accounts.Account_id = Clients.Account_id
  SET Stamps_counter = 0
  WHERE Accounts.Email = '${email}';`;

  req.app.database.query(sql, function (err, result) {
    res.status(200).send({ message: "Stamps counter = 0" });
  });
});

module.exports = router;
