const express = require("express");
const router = express.Router();

const {
  getShowtime,
  addShow,
  editShow,
} = require("../controllers/showtime.controller");
const { isAdmin } = require("../middlewares/auth");

router.get("/", getShowtime);
router.post("/add", isAdmin, addShow);
router.put("/edit", isAdmin, editShow);

module.exports = router;
