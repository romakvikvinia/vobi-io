const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    activated: { type: GraphQLBoolean },
    check: { type: GraphQLBoolean }
  })
});

module.exports = UserType;
