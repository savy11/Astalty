const mongoose = require("mongoose");

const supportActivitySchema = new mongoose.Schema({

  participantId: String,

  date: Date,

  location: String,

  type: String,

  practitioner: String,

  invoiceStatus: String

});

module.exports = mongoose.model("SupportActivity", supportActivitySchema);