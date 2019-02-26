const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const InvoiceType = require("./InvoiceType");

const InvoiceListType = new GraphQLObjectType({
  name: "InvoiceListType",
  fields: () => ({
    page: { type: GraphQLInt },
    total: { type: GraphQLInt },
    invoices: { type: new GraphQLList(InvoiceType) }
  })
});

module.exports = InvoiceListType;
