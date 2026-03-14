const express = require("express");
const router = express.Router();

const { getTags } = require("../controllers/tag-controller");

router.get("/tags", getTags);

module.exports = router;