const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} = require("graphql");

const DetailType = new GraphQLObjectType({
  name: "DetailType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    price: { type: GraphQLInt },
    total: { type: GraphQLInt },
    userID: { type: GraphQLID },
    invoiceID: { type: GraphQLID }
  })
});

module.exports = DetailType;
