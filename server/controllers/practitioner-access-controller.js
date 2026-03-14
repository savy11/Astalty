const PractitionerAccess = require("../models/practitioner-access-model");

exports.getPractitionerAccess = async (req, res) => {

  try {

    const { participantId } = req.params;

    const practitioners = await PractitionerAccess.find({
      participantId
    });

    res.json({
      success: true,
      message: "Practitioner access fetched successfully",
      data: practitioners
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};