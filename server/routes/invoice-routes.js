const express = require("express");
const router = express.Router();

const controller = require("../controllers/invoice-controller");
const validateToken = require("../Middleware/ValidateTokenHandler");

router.get(
  "/participants/:participantId/invoices",
  validateToken,
  controller.getInvoices
);

module.exports = router;