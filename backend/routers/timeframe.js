const express = require("express");
const router = express.Router();
const {
  getAllTimeFrame,
  addTimeframe,
  editTimeFrame,
} = require("../controllers/timeframe.controller");
const { isAdmin } = require("../middlewares/auth");

router.get("/", isAdmin, getAllTimeFrame);
router.post("/add", isAdmin, addTimeframe);
router.put("/edit", isAdmin, editTimeFrame);

module.exports = router;
