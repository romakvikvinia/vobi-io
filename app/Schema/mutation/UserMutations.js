const { GraphQLNonNull, GraphQLString } = require("graphql");
const bcrypt = require("bcrypt");
const { createToken } = require("../../Service/Auth");
const Model = require("../../Models");
const UserType = require("../types/UserType");
const TokenType = require("../types/TokenType");

/**
 * Sing up User
 */
const singup = {
  type: UserType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (parent, { username, email, password }, request) => {
    console.log({ username, email, password });
    return await new Model.User({ username, email, password }).save();
  }
};

/**
 * Signin user
 */

const login = {
  type: TokenType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (parent, { username, password }) => {
    const user = await Model.User.findOne({ username });

    if (!user) {
      throw new Error("User not Found");
    } else {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error("Invalid Password");
      return { token: createToken(user) };
    }
    return { token: true };
  }
};
module.exports = {
  singup,
  login
};
