const express = require("express");
const router = express.Router();

const controller = require("../controllers/practitioner-access-controller");
const validateToken = require("../Middleware/ValidateTokenHandler");

router.get(
  "/participants/:participantId/practitioner-access",
  validateToken,
  controller.getPractitionerAccess
);

module.exports = router;