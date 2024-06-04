const express = require("express");
const router = express.Router();

const {
  getCinemaShowMovie,
  getSeatForBooking,
  getAllShowMovieByCinema,
} = require("../controllers/ticket.controller");
const { auth } = require("../middlewares/auth");
router.post("/", getCinemaShowMovie);
router.post("/seats", auth, getSeatForBooking);
router.post("/all", getAllShowMovieByCinema);

module.exports = router;
