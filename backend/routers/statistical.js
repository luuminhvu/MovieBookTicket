const express = require("express");
const router = express.Router();

const {
  getRevenueAndTicketsByDay,
  getRevenueByDayOfMonth,
  getTopMoviesByRevenue,
  getTopGenresByRevenue,
  getTopTimeFramesByRevenue,
} = require("../controllers/statistical.controller");
const { isAdmin } = require("../middlewares/auth");

router.get("/revenue-by-day", isAdmin, getRevenueAndTicketsByDay);
router.post("/revenue-by-month", isAdmin, getRevenueByDayOfMonth);
router.get("/top-movies-by-revenue", isAdmin, getTopMoviesByRevenue);
router.get("/top-genres-by-revenue", isAdmin, getTopGenresByRevenue);
router.get("/top-timeframes-by-revenue", isAdmin, getTopTimeFramesByRevenue);

module.exports = router;
