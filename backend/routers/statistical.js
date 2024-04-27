const express = require("express");
const router = express.Router();

const {
  getRevenueAndTicketsByDay,
  getRevenueByDayOfMonth,
  getTopMoviesByRevenue,
  getTopGenresByRevenue,
  getTopTimeFramesByRevenue,
} = require("../controllers/statistical.controller");

router.get("/revenue-by-day", getRevenueAndTicketsByDay);
router.post("/revenue-by-month", getRevenueByDayOfMonth);
router.get("/top-movies-by-revenue", getTopMoviesByRevenue);
router.get("/top-genres-by-revenue", getTopGenresByRevenue);
router.get("/top-timeframes-by-revenue", getTopTimeFramesByRevenue);

module.exports = router;
