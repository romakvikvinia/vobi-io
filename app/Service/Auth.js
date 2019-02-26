const jwt = require("jsonwebtoken");
const config = require("../config/app");
const createToken = user => {
  const { username, email } = user;
  const { expiresIn } = config;
  return jwt.sign({ username, email }, config.secret_key, { expiresIn });
};
module.exports = {
  createToken
};
