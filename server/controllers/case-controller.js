const Case = require("../models/case-model");

exports.getCases = async (req, res) => {

  try {

    const { participantId } = req.params;

    const cases = await Case
      .find({ participantId })
      .sort({ issueDate: -1 });

    res.json({
      success: true,
      message: "Cases fetched successfully",
      data: cases
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};