const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

  participantId: String,

  paymentNumber: String,

  from: String,

  amount: Number,

  paymentDate: Date

});

module.exports = mongoose.model("Payment", paymentSchema);