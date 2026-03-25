const express = require("express");
const router = express.Router();

const controller = require("../controllers/communication-controller");
const validateToken = require("../Middleware/ValidateTokenHandler");

router.get(
  "/participants/:participantId/communications",
  validateToken,
  controller.getCommunications
);

module.exports = router;