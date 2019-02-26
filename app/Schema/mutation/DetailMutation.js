const {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} = require("graphql");
const DetailType = require("../types/DetailType");
//Modal
const Model = require("../../Models");

const createInvoiceDetails = {
  type: DetailType,
  args: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    total: { type: new GraphQLNonNull(GraphQLInt) },
    invoiceID: { type: new GraphQLNonNull(GraphQLID) },
    userID: { type: GraphQLID }
  },
  resolve: async (
    parent,
    { name, description, quantity, price, total, userID, invoiceID },
    { auth }
  ) => {
    const user = await Model.User.findOne({ username: auth.username });
    userID = user._id;
    return new Model.Detail({
      name,
      description,
      quantity,
      price,
      total,
      userID,
      invoiceID
    }).save();
  }
};
/**
 * edit invoice details
 */
const editInvoiceDetails = {
  type: DetailType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    total: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve: async (
    parent,
    { id, name, description, quantity, price, total },
    { auth }
  ) => {
    const user = await Model.User.findOne({ username: auth.username });
    userID = user._id;

    return await Model.Detail.findOneAndUpdate(
      { _id: id, userID },
      {
        $set: { name, description, quantity, price, total }
      },
      { new: true }
    );
  }
};

//delete detail
const deleteInvoiceDetails = {
  type: DetailType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    userID: { type: GraphQLID }
  },
  resolve: async (parent, { id, userID }, { auth }) => {
    const user = await Model.User.findOne({ username: auth.username });
    userID = user._id;
    return await Model.Detail.findOneAndRemove({ _id: id, userID });
  }
};
module.exports = {
  createInvoiceDetails,
  editInvoiceDetails,
  deleteInvoiceDetails
};
