const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const config = require("./config/app");
const app = express();

//pars requests
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//cors
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://vobi-io.herokuapp.com"
        : "http://localhost:3000",

    credentials: true
  })
);

//JWT authorization middleware

app.use(async (req, res, next) => {
  const token = req.headers["authorization"];

  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(
        token,
        process.env.SECRET || config.secret_key
      );
      req.auth = currentUser;
    } catch (err) {
      // console.error(err);
    }
  }
  next();
});

//Router
app.use(require("./Http/Controller/GraphQLController"));

//server static asset if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    );
  });
}

module.exports = app;
