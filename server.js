const app = require("./app/app");
const db = require("./app/config/database");

db().then(() => {
  app.listen(process.env.PORT || 8080, () => console.log("Server up "));
});
