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

router.post("/cleanStamps", middlewares.auth, function (req, res, next) {
  console.log('jestem!!!!!!')
  const { email } = req.body;

  const sql = `UPDATE Accounts LEFT JOIN Clients ON Accounts.Account_id = Clients.Account_id
  SET Stamps_counter = 0
  WHERE Accounts.Email = '${email}';`;

  

  req.app.database.query(sql, function (err, result) {
    res.status(200).send({ message: "Stamps counter = 0" });
  });
});

module.exports = router;
