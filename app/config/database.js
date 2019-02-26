const mongoose = require("mongoose");

module.exports = async function() {
  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);
  const { ObjectId } = mongoose.Types;
  ObjectId.prototype.valueOf = function() {
    return this.toString();
  };
  await mongoose
    .connect("mongodb://root:roma123@ds251284.mlab.com:51284/vobi-graphql", {
      useNewUrlParser: true
    })
    .then(() => console.log("Database Connected"));
};
