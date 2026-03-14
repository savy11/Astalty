const SupportActivity = require("../models/support-activity-model");

exports.getSupportActivities = async (req, res) => {

  try {

    const { participantId } = req.params;

    const activities = await SupportActivity
      .find({ participantId })
      .sort({ date: -1 });

    res.json({
      success: true,
      message: "Support activities fetched successfully",
      data: activities
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};