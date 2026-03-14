const express = require("express");
const router = express.Router();

const controller = require("../controllers/support-activity-controller");
const validateToken = require("../Middleware/ValidateTokenHandler");

router.get(
  "/participants/:participantId/support-activities",
  validateToken,
  controller.getSupportActivities
);

module.exports = router;