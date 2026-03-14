const express = require("express");
const router = express.Router();
const controller = require("../controllers/appointment-controller");

router.get("/participants/:participantId/appointments", controller.getAppointments);

module.exports = router;