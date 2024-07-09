const mongoose = require("mongoose");

const blackListSchema = new mongoose.Schema(
  {
    blackListToken: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const BlackListModel = mongoose.model("BlackListToken", blackListSchema);

module.exports = { BlackListModel };
