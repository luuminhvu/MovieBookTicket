const express = require("express");
const router = express.Router();

const {
  getNews,
  getNewsById,
  addNews,
  updateNews,
  deleteNews,
} = require("../controllers/news.controller");
const { isAdmin } = require("../middlewares/auth");

router.get("/", getNews);
router.get("/:id", getNewsById);
router.post("/", isAdmin, addNews);
router.put("/", isAdmin, updateNews);
router.delete("/:id", isAdmin, deleteNews);

module.exports = router;
