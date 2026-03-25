const ProgressNote = require("../models/progress-note-model");

exports.getProgressNotes = async (req, res) => {

  try {

    const { participantId } = req.params;

    const notes = await ProgressNote
      .find({ participantId })
      .sort({ serviceDate: -1 });

    res.json({
      success: true,
      message: "Progress notes fetched successfully",
      data: notes
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};