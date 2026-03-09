const express = require('express') 
const router = express.Router();
const validateToken = require("../Middleware/ValidateTokenHandler");

const { fetch,create, fetchById } = require("../controllers/participant-controller.js")

router.post("/create",validateToken,create);
router.get("/fetch",validateToken,fetch);
router.get("/:id", validateToken, fetchById);
module.exports = router;    