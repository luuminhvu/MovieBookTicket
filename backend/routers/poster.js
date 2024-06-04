const express = require("express");
const {
  getPosters,
  deletePoster,
  editPoster,
  addPoster,
} = require("../controllers/poster.controller");
const { isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.get("/", getPosters);
router.post("/add", isAdmin, addPoster);
router.put("/edit", isAdmin, editPoster);
router.delete("/delete/:id", isAdmin, deletePoster);
module.exports = router;
