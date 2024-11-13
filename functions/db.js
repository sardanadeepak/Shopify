const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  redeemCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const Code = mongoose.model("Code", codeSchema);

module.exports = { Code };
