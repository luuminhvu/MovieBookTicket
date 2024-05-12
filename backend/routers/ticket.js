const express = require("express");
const router = express.Router();

const {
  getCinemaShowMovie,
  getSeatForBooking,
  getAllShowMovieByCinema,
} = require("../controllers/ticket.controller");
router.post("/", getCinemaShowMovie);
router.post("/seats", getSeatForBooking);
router.post("/all", getAllShowMovieByCinema);

module.exports = router;
