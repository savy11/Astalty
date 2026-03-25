const express = require("express");
const router = express.Router();

const controller = require("../controllers/payment-controller");
const validateToken = require("../Middleware/ValidateTokenHandler");

router.get(
  "/participants/:participantId/payments",
  validateToken,
  controller.getPayments
);

module.exports = router;