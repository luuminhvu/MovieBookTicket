const express = require("express");
const router = express.Router();

const {
  getSeatOfCinemaHall,
  getSeatsByCinemaHallID,
} = require("../controllers/seat.controller");

router.get("/", getSeatOfCinemaHall);
router.post("/cinemahallid", getSeatsByCinemaHallID);
module.exports = router;
