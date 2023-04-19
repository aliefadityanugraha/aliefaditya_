/** @format */

"use strict";

var mongosee = require("mongoose");

const uri =
  "mongodb+srv://aliefalief2005:zCYSCawEjFNldTCG@aliefaaditya0.vdnnx0x.mongodb.net/?retryWrites=true&w=majority";

mongosee.connect(uri, (err) => {
  if (err) {
    console.error(err);
    console.log("Connection to database error. Check error information");
  }

  console.log("Connected to database in MongoDB server...");
});
