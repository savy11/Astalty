const mongoose = require("mongoose");

const progressNoteSchema = new mongoose.Schema({

  participantId: String,

  name: String,

  createdBy: String,

  serviceDate: Date,

  lastUpdate: Date,

  createdAt: Date,

  status: {
    type: String,
    default: "Final"
  }

});

module.exports = mongoose.model("ProgressNote", progressNoteSchema);