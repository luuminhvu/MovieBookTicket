const express = require("express");
const router = express.Router();

const {
  getSeatOfCinemaHall,
  getSeatsByCinemaHallID,
} = require("../controllers/seat.controller");
const { isAdmin } = require("../middlewares/auth");

router.get("/", getSeatOfCinemaHall);
router.post("/cinemahallid", isAdmin, getSeatsByCinemaHallID);
module.exports = router;
