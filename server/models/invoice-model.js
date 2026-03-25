const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({

  participantId: String,

  invoiceNumber: String,

  participantName: String,

  organisation: String,

  location: String,

  practitioner: String,

  issueDate: Date,

  dueDate: Date,

  amount: Number,

  outstanding: Number,

  status: String,

  sentStatus: String

});

module.exports = mongoose.model("Invoice", invoiceSchema);