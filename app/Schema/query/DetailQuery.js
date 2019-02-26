const { GraphQLNonNull, GraphQLID } = require("graphql");
const Model = require("../../Models");
const DetailType = require("../types/DetailType");
const getInvoiceDetailsByInvoiceId = {
  type: DetailType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: async (parent, { id }, request) => {
    return await Model.Detail.findOne({ invoiceID: id });
  }
};

module.exports = {
  getInvoiceDetailsByInvoiceId
};
