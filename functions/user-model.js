const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  createdOn: {
    type: String,
  },
  code: {
    type: String,
  },
});

const UserSchema = mongoose.model("user-data", userSchema);

module.exports = { UserSchema };
