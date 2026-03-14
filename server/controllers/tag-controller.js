const tag = require('../models/tag-model')

exports.getTags = async (req, res) => {
  try {
    const tags = await tag.find().select("name");
    res.status(200).json({
      success: true,
      data: tags,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};