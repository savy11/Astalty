const express = require("express");
const router = express.Router();

const controller = require("../controllers/case-controller");
const validateToken = require("../Middleware/ValidateTokenHandler");

router.get(
  "/participants/:participantId/cases",
  validateToken,
  controller.getCases
);

module.exports = router;