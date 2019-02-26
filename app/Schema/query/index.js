const { GraphQLObjectType } = require("graphql");

const { getUsers, auth } = require("./UserQuery");

const { getInvoiceDetailsByInvoiceId } = require("./DetailQuery");
const {
  getInvoiceById,
  getInvoices,
  getInvoicesByUserId
} = require("./InvoiceQuery");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    auth,
    getUsers,
    getInvoices,
    getInvoiceById,
    getInvoicesByUserId,
    getInvoiceDetailsByInvoiceId
  })
});

module.exports = RootQuery;
