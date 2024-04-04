const express = require("express");
const router = express.Router();
const {
  getAllTimeFrame,
  addTimeframe,
} = require("../controllers/timeframe.controller");

router.get("/", getAllTimeFrame);
router.post("/add", addTimeframe);

module.exports = router;
