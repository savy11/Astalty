const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  participantId: String,
  date: Date,
  location: String,
  type: String,
  subType: String,
  practitioner: String,
  invoiceStatus: String,
  status: String
});

module.exports = mongoose.model("Appointment", appointmentSchema);