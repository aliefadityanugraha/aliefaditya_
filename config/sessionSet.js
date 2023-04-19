/** @format */

const sessions = require("express-session");
const mongodb = require("./mongodb");

const isOneDay = 1000 * 60 * 60 * 24;

const sessionConf = sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: isOneDay },
  resave: false,
});

module.exports = {
  sessionConf,
};
