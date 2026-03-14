const mongoose = require("mongoose");

const practitionerAccessSchema = new mongoose.Schema({

  participantId: String,

  name: String,

  roleName: String,

  roleType: String,

  group: String,

  status: String

});

module.exports = mongoose.model("PractitionerAccess", practitionerAccessSchema);