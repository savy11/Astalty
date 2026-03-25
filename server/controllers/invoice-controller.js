const Invoice = require("../models/invoice-model");

exports.getInvoices = async (req, res) => {

  try {

    const { participantId } = req.params;

    const invoices = await Invoice
      .find({ participantId })
      .sort({ issueDate: -1 });

    res.json({
      success: true,
      message: "Invoices fetched successfully",
      data: invoices
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};