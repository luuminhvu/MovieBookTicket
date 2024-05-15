const express = require("express");
const router = express.Router();

const {
  getNews,
  getNewsById,
  addNews,
  updateNews,
  deleteNews,
} = require("../controllers/news.controller");

router.get("/", getNews);
router.get("/:id", getNewsById);
router.post("/", addNews);
router.put("/", updateNews);
router.delete("/:id", deleteNews);

module.exports = router;
