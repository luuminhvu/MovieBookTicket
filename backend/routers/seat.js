const express = require("express");
const router = express.Router();

const { getSeatOfCinemaHall } = require("../controllers/seat.controller");

router.get("/", getSeatOfCinemaHall);

module.exports = router;
