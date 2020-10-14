require('dotenv').config()
var createError = require("http-errors");
var express = require("express");
var path = require("path");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var accountsRouter = require("./routes/accounts");

var app = express();

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "O49ZfqTsxO",
  password: "IEsUsL9KBy",
  database: "O49ZfqTsxO",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  req.app.database = connection
  next()
});

app.use("/", indexRouter);
app.use("/accounts", accountsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
