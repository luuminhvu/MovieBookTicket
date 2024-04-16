const express = require("express");
const router = express.Router();

const {
  getCinemas,
  getCinemaHallByCinemaID,
  addCinema,
  editCinema,
  getCinemaHall,
  addCinemaHall,
  editCinemaHall,
} = require("../controllers/cinema.controller");

router.get("/", getCinemas);
router.get("/cinemahall", getCinemaHall);
router.post("/cinemahall", getCinemaHallByCinemaID);
router.post("/add", addCinema);
router.put("/edit", editCinema);
router.post("/cinemahall/add", addCinemaHall);
router.put("/cinemahall/edit", editCinemaHall);

module.exports = router;
