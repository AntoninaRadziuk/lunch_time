const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  let sql = "select * from Accounts";
  req.app.database.query(sql, (err, results, fields) => {
    console.log(results, err, fields);
  });
  res.send("respond with a resource");
});

router.post("/login", function (req, res, next) {
  const email = req.body.email;

  console.log("body", req.body);

  if (email) {
    res.status(200).send({ id: "user", email });
  } else {
    res.status(400).send({ err: "Wrong email or password " });
  }
});

router.post("/register/user", function (req, res, next) {
  const { email, password } = req.body;
  let sql1 = ` INSERT INTO Accounts (email, password, accounttype) VALUES ('${email}', '${password}', 'Client');`;
  let sql2 = `INSERT INTO Clients (email) VALUES ('${email}')`;

  req.app.database.query(sql1, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted into Accounts", result.insertId);
    // res.status(201).send({ email: email });
  });

  req.app.database.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted into Clients", result.insertId);
    res.status(201).send({ client_email: email });
  });
});

// router.post("/register/restaurant", function (req, res, next) {
//   const { email, password } = req.body;
//   let sql = ` INSERT INTO Accounts (email, password, accounttype) VALUES ('${email}', '${password}', 'Restaurant');`;

//   req.app.database.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted into Accounts", result.insertId);
//     res.status(201).send({ email: email });
//   });
// });

router.post("/register/restaurant", function (req, res, next) {
  const {
    email,
    password,
    restaurantName,
    restaurantAddress,
    lunchTimeStart,
    lunchTimeEnd,
    websiteAddress,
  } = req.body;
  let sql1 = ` INSERT INTO Accounts (email, password, accounttype) VALUES ('${email}', '${password}', 'Restaurant');`;
  let sql2 = ` INSERT INTO Restaurants (email, name, address, lunch_start_time, lunch_end_time, website_address) VALUES ('${email}', '${restaurantName}', '${restaurantAddress}', '${lunchTimeStart}', '${lunchTimeEnd}', '${websiteAddress}');`;

  req.app.database.query(sql1, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted into Accounts", result.insertId);
  });

  req.app.database.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted into Restaurants", result.insertId);
    res.status(201).send({ email: email });
  });
});

module.exports = router;
