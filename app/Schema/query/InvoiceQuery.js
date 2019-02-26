const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLID
} = require("graphql");
const Model = require("../../Models");
const InvoiceType = require("../types/InvoiceType");
const InvoiceListType = require("../types/InvoiceListType");

/*
 * get all invoices
 * @param pagination searchText
 */

const getInvoices = {
  type: InvoiceListType,
  args: {
    pagination: { type: new GraphQLNonNull(GraphQLString) },
    searchText: { type: GraphQLString }
  },
  resolve: async (parent, { pagination, searchText }, request) => {
    const perPage = 2;
    let total, invoices;

    pagination = pagination ? Number(pagination) : 1;

    if (searchText) {
      console.log(searchText);
      total = await Model.Invoice.find(
        {
          $text: { $search: searchText }
        },
        {
          score: { $meta: "textScore" }
        }
      ).countDocuments();
      invoices = await Model.Invoice.find({ $text: { $search: searchText } })
        .skip(perPage * pagination - perPage)
        .limit(perPage)
        .sort({ updatedAt: "desc" })
        .populate("userID");
    } else {
      total = await Model.Invoice.countDocuments();

      invoices = await Model.Invoice.find({})
        .skip(perPage * pagination - perPage)
        .limit(perPage)
        .sort({ updatedAt: "desc" })
        .populate("userID");
    }

    return {
      page: pagination,
      total,
      invoices
    };
  }
};

// const getInvoices = {
//   type: new GraphQLList(InvoiceType),
//   args: {
//     pagination: { type: new GraphQLNonNull(GraphQLString) },
//     searchText: { type: GraphQLString }
//   },
//   resolve: async (parent, { pagination, searchText }, request) => {
// const perPage = 10;
// pagination = pagination ? pagination : 1;
// console.log(perPage * pagination - perPage);

// return await Model.Invoice.find({})
//   .skip(perPage * pagination - perPage)
//   .limit(perPage)
//   .sort({ updatedAt: "desc" })
//   .populate("userID");
//   }
// };
/**
 * Get invoice By id
 * @param id
 */
const getInvoiceById = {
  type: InvoiceType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: async (parent, { id }, request) => {
    return Model.Invoice.findById(id);
  }
};

const getInvoicesByUserId = {
  type: InvoiceType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: async (parent, { id }, request) => {
    return Model.Invoice.findOne({ userID: id });
  }
};

module.exports = {
  getInvoices,
  getInvoiceById,
  getInvoicesByUserId
};
