const express = require("express");
const router = express.Router();

const {
  getShowtime,
  addShow,
  editShow,
} = require("../controllers/showtime.controller");

router.get("/", getShowtime);
router.post("/add", addShow);
router.put("/edit", editShow);

module.exports = router;
