const express = require("express");
const router = express.Router();

const {
  getCinemas,
  getCinemaHallByCinemaID,
  addCinema,
  editCinema,
  getCinemaHall,
} = require("../controllers/cinema.controller");

router.get("/", getCinemas);
router.get("/cinemahall", getCinemaHall);
router.post("/cinemahall", getCinemaHallByCinemaID);
router.post("/add", addCinema);
router.put("/edit", editCinema);

module.exports = router;
