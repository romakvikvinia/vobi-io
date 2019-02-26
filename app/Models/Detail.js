const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Table = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  quantity: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    default: 1
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  invoiceID: {
    type: Schema.Types.ObjectId,
    ref: "Invoice"
  }
});

Table.set("toJSON", {
  virtuals: true
});

// user enter one lari and we change to tetri
Table.pre("save", function(next) {
  if (!this.isModified("price")) return next();
  // this.price = this.price *100;
  this.price = this.price;
  next();
});
Table.pre("init", function(next) {
  // next.price = next.price *100;
  next.price = next.price;
});
module.exports = mongoose.model("Detail", Table);
