/** @format */

const express = require("express");
const path = require("path");
const helmet = require("helmet");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const { client } = require("./config/mongodb");
const { sessionConf } = require("./config/sessionSet");
const multer = require("./config/multer");

const routerV2 = require("./routes/v2");
const router = require("./routes/web");

const app = express();

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       scriptSrc: ['self','https://cdn.tailwindcss.com', 'https://unpkg.com' ],
//       styleSrc: ['self','https://cdn.tailwindcss.com' ],
//       imgSrc:'/*',
//       objectSrc:'/*',
//     },
//     reportOnly: true,
//   })
// );
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(sessionConf);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
var session;

app.use((req, res, next) => {
  req.con = client;
  next();
});

app.use(multer);
app.use("/", router);
app.use("/v2", routerV2);

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    console.log(err);
    console.log(`Runing server error. Check error information`);
    process.exit();
  } else {
    console.log(
      `Server listening on port http://localhost:${process.env.PORT}`
    );
  }
});
