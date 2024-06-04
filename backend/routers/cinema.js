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
const { isAdmin, auth } = require("../middlewares/auth");

router.get("/", getCinemas);
router.get("/cinemahall", auth, getCinemaHall);
router.post("/cinemahall", auth, getCinemaHallByCinemaID);
router.post("/add", isAdmin, addCinema);
router.put("/edit", isAdmin, editCinema);
router.post("/cinemahall/add", isAdmin, addCinemaHall);
router.put("/cinemahall/edit", isAdmin, editCinemaHall);

module.exports = router;
