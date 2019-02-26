const { GraphQLObjectType } = require("graphql");
const UserType = require("../types/UserType");
const Model = require("../../Models");

const getUsers = {
  type: UserType,
  args: {},
  resolve: async (parent, args, request) => {
    return await Model.User.find({});
  }
};

const auth = {
  type: UserType,
  args: {},
  resolve: async (parent, args, { auth }) => {
    if (auth && Object.keys(auth).length) auth.check = true;
    return auth;
  }
};

module.exports = {
  getUsers,
  auth
};
