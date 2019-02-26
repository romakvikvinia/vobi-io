const { GraphQLSchema } = require("graphql");
const RootQuery = require("./query");
const Mutations = require("./mutation");

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutations });
