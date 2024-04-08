const express = require("express");
const router = express.Router();
const {
  getAllTimeFrame,
  addTimeframe,
  editTimeFrame,
} = require("../controllers/timeframe.controller");

router.get("/", getAllTimeFrame);
router.post("/add", addTimeframe);
router.put("/edit", editTimeFrame);

module.exports = router;
