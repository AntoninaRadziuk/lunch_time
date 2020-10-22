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

  const sql = ` SELECT account_type, email, name, address, Lunch_start_time, Lunch_end_time, Soup_price, Dish_price, Set_price, Set_and_drink_price, Website_address 
                FROM Accounts left join Restaurants on Accounts.Account_id = Restaurants.Account_id
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
      name: results[0].name,
      address: results[0].address,
      lunch_start_time: results[0].Lunch_start_time,
      lunch_end_time: results[0].Lunch_end_time,
      soup_price:results[0].Soup_price,
      dish_price: results[0].Dish_price,
      set_price: results[0].Set_price,
      set_and_drink_price: results[0].Set_and_drink_price,
      website_address: results[0].Website_address,
    });
  });
});

module.exports = router;
