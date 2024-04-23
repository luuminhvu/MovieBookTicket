const express = require("express");
const router = express.Router();

const {
  getRevenueAndTicketsByDay,
  getRevenueByDayOfMonth,
  getTopMoviesByRevenue,
} = require("../controllers/statistical.controller");

router.get("/revenue-by-day", getRevenueAndTicketsByDay);
router.post("/revenue-by-month", getRevenueByDayOfMonth);
router.get("/top-movies-by-revenue", getTopMoviesByRevenue);

module.exports = router;
