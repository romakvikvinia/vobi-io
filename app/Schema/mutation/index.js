const { GraphQLObjectType } = require("graphql");
const { singup, login } = require("./UserMutations");
const {
  createInvoice,
  editInvoice,
  deleteInvoice
} = require("./InvoiceMutations");

const {
  createInvoiceDetails,
  editInvoiceDetails,
  deleteInvoiceDetails
} = require("./DetailMutation");

const mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: () => ({
    login,
    singup,
    createInvoice,
    editInvoice,
    deleteInvoice,
    createInvoiceDetails,
    editInvoiceDetails,
    deleteInvoiceDetails
  })
});
module.exports = mutations;
