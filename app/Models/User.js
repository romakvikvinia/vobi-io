const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Table = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      max: 40
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    activated: {
      type: Number,
      default: false
    }
  },
  { timestamps: true }
);

Table.set("toJSON", {
  virtuals: true
});

//password hashing
Table.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", Table);
