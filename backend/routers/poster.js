const express = require("express");
const {
  getPosters,
  deletePoster,
  editPoster,
  addPoster,
} = require("../controllers/poster.controller");
const router = express.Router();

router.get("/", getPosters);
router.post("/add", addPoster);
router.put("/edit", editPoster);
router.delete("/delete/:id", deletePoster);
module.exports = router;
