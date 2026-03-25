const mongoose = require("mongoose");

const communicationSchema = new mongoose.Schema({
  participantId: String,

  date: Date,

  subject: String,

  type: {
    type: String,
    default: "Email"
  },

  direction: {
    type: String,
    default: "Outbound"
  },

  status: {
    type: String,
    default: "Delivered"
  },

  linkTitle: String,

  linkUrl: String

});

module.exports = mongoose.model("Communication", communicationSchema);