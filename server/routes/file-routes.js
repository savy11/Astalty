const express = require("express");
const router = express.Router();

const controller = require("../controllers/file-controller");
const validateToken = require("../Middleware/ValidateTokenHandler");

router.get(
  "/participants/:participantId/files",
  validateToken,
  controller.getFiles
);

module.exports = router;