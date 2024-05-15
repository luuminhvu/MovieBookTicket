const express = require("express");
const { getPosters } = require("../controllers/poster.controller");
const router = express.Router();

router.get("/", getPosters);
module.exports = router;
