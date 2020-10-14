const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, "myPrivateKey", function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "Invalid token" });
    }

    const email = decoded.email;

    const sql = `SELECT * FROM Accounts WHERE email='${email}'`;

    req.app.database.query(sql, function (err, result) {
      if (!!err || (result && result[0] === undefined)) {
        console.log("Invalid token!!");
        return res.status(403).send({ email: "Invalid token" });
      }
      next();// res.status(201).send({ email: email });
    });
  });
 };

module.exports = { auth };
