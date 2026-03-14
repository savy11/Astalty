const Appointment = require("../models/appointment-model");

exports.getAppointments = async (req, res) => {
  try {

    const { participantId } = req.params;

    const appointments = await Appointment
      .find({ participantId })
      .sort({ date: -1 });

    res.json({
      success: true,
      message: "Appointments fetched successfully",
      data: appointments
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};