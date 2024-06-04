const express = require("express");
const router = express.Router();

const {
  getMovies,
  getMovieDetail,
  addMovie,
  editMovie,
} = require("../controllers/movie.controller");
const { isAdmin } = require("../middlewares/auth");

router.get("/", getMovies);
router.get("/:id", getMovieDetail);
router.post("/add", isAdmin, addMovie);
router.put("/edit", isAdmin, editMovie);

module.exports = router;
