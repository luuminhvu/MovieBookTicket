const express = require("express");
const router = express.Router();

const { getRevenueByDay } = require("../controllers/statistical.controller");

router.get("/revenue-by-day", getRevenueByDay);

module.exports = router;
