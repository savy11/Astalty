const Communication = require("../models/communication-model");

exports.getCommunications = async (req, res) => {
  try {

    const { participantId } = req.params;

    const communications = await Communication
      .find({ participantId })
      .sort({ date: -1 });

    res.json({
      success: true,
      message: "Communications fetched successfully",
      data: communications
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};