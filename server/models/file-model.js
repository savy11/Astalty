const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({

  participantId: String,

  name: String,

  uploader: String,

  uploadDate: Date,

  fileSize: String,

  fileUrl: String

});

module.exports = mongoose.model("File", fileSchema);