const { GraphQLNonNull, GraphQLID, GraphQLString } = require("graphql");
const Model = require("../../Models");
const InvoiceType = require("../types/InvoiceType");

/**
 * Creat invoice
 * @param name ,
 * @param description
 * @param contactName
 * @param address
 * @param date
 * @param userID
 */
const createInvoice = {
  type: InvoiceType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    contactName: { type: GraphQLString },
    address: { type: GraphQLString },
    date: { type: GraphQLString },
    userID: { type: GraphQLID }
  },
  resolve: async (
    parent,
    { name, description, contactName, address, date },
    { auth }
  ) => {
    const user = await Model.User.findOne({ username: auth.username });

    return await new Model.Invoice({
      name,
      description,
      contactName,
      address,
      date,
      userID: user._id
    }).save();
  }
};

/**
 * Edit invoice
 * @param id
 * @param name
 * @param description
 * @param contactName
 */

const editInvoice = {
  type: InvoiceType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    contactName: { type: GraphQLString },
    address: { type: GraphQLString },
    date: { type: GraphQLString },
    userID: { type: GraphQLID }
  },
  resolve: async (
    parent,
    { id, name, description, contactName, address, date },
    { auth }
  ) => {
    //get user id by username
    const user = await Model.User.findOne({ username: auth.username });
    // big int
    date = Number(date);

    console.log({ _id: id, userID: user._id });

    const invoice = await Model.Invoice.findOneAndUpdate(
      { _id: id, userID: user._id },
      {
        $set: { name, description, contactName, address, date }
      },
      { new: true }
    );

    return invoice;
  }
};

const deleteInvoice = {
  type: InvoiceType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    userID: { type: GraphQLID }
  },
  resolve: async (parent, { id }, { auth }) => {
    const user = await Model.User.findOne({ username: auth.username });
    userID = user._id;

    return await Model.Invoice.findOneAndRemove({ _id: id, userID });
  }
};

module.exports = {
  createInvoice,
  editInvoice,
  deleteInvoice
};
