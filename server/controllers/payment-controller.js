const Payment = require("../models/payment-model");

exports.getPayments = async (req, res) => {

  try {

    const { participantId } = req.params;

    const payments = await Payment
      .find({ participantId })
      .sort({ paymentDate: -1 });

    res.json({
      success: true,
      message: "Payments fetched successfully",
      data: payments
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};