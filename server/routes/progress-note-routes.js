const express = require("express");
const router = express.Router();

const controller = require("../controllers/progress-note-controller");
const validateToken = require("../Middleware/ValidateTokenHandler");

router.get(
  "/participants/:participantId/progress-notes",
  validateToken,
  controller.getProgressNotes
);

module.exports = router;