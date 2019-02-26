const mongoose = require("mongoose");

const Table = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    description: {
      type: String
    },
    contactName: {
      type: String
    },
    address: {
      type: String
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);
Table.set("toJSON", {
  virtuals: true
});
/**
 * Make indexes for search
 */
Table.index({
  "$**": "text"
});
module.exports = mongoose.model("Invoice", Table);
