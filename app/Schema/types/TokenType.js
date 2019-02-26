const { GraphQLObjectType, GraphQLString } = require("graphql");

const TokenType = new GraphQLObjectType({
  name: "TokenType",
  fields: () => ({
    token: { type: GraphQLString }
  })
});

module.exports = TokenType;
