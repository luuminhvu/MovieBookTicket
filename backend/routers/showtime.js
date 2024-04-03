const express = require("express");
const router = express.Router();

const { getShowtime } = require("../controllers/showtime.controller");

router.get("/", getShowtime);

module.exports = router;
