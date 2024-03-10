const express = require("express");
const router = express.Router();

const { getCinemaShowMovie } = require("../controllers/ticket.controller");
router.post("/", getCinemaShowMovie);

module.exports = router;
