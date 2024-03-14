const express = require("express");
const router = express.Router();

const {
  getCinemaShowMovie,
  getSeatForBooking,
} = require("../controllers/ticket.controller");
router.post("/", getCinemaShowMovie);
router.post("/seats", getSeatForBooking);

module.exports = router;
