const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} = require("graphql");
const DetailType = require("./DetailType");
const UserType = require("./UserType");
//models
const Model = require("../../Models/index");

const InvoiceType = new GraphQLObjectType({
  name: "InvoiceType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    contactName: { type: GraphQLString },
    address: { type: GraphQLString },
    date: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    user: {
      type: UserType,
      args: {},
      resolve: (parent, args, request) => {
        return parent.userID;
      }
    },
    detail: {
      type: DetailType,
      args: {},
      resolve: async (parent, args, req) => {
        return await Model.Detail.findOne({ invoiceID: parent.id });
      }
    }
  })
});

module.exports = InvoiceType;
