const File = require("../models/file-model");

exports.getFiles = async (req, res) => {

  try {

    const { participantId } = req.params;

    const files = await File
      .find({ participantId })
      .sort({ uploadDate: -1 });

    res.json({
      success: true,
      message: "Files fetched successfully",
      data: files
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};