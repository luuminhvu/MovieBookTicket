const express = require("express");
const router = express.Router();

const {
  getCinemas,
  getCinemaHallByCinemaID,
  addCinema,
} = require("../controllers/cinema.controller");

router.get("/", getCinemas);
router.post("/cinemahall", getCinemaHallByCinemaID);
router.post("/add", addCinema);

module.exports = router;
