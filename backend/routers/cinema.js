const express = require("express");
const router = express.Router();

const {
  getCinemas,
  getCinemaHallByCinemaID,
} = require("../controllers/cinema.controller");

router.get("/", getCinemas);
router.post("/cinemahall", getCinemaHallByCinemaID);

module.exports = router;
