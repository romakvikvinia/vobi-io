const app = require("express").Router();
const graphql = require("express-graphql");
const schema = require("../../Schema");

app.use(
  "/graphql",
  graphql({
    schema,
    graphiql: true,
    formatError: err => {
      //format error

      const { message } = err;
      return { message };
    }
  })
);
module.exports = app;
