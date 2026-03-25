const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({

  participantId: String,

  caseNumber: String,

  issueDate: Date,

  expiryDate: Date,

  assignee: String,

  type: String,

  allocatedAmount: Number,

  totalAmount: Number,

  invoicedAmount: Number,

  status: String

});

module.exports = mongoose.model("Case", caseSchema);