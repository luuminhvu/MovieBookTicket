const express = require("express");
const router = express.Router();

const {
  getMovies,
  getMovieDetail,
  addMovie,
  editMovie,
} = require("../controllers/movie.controller");

router.get("/", getMovies);
router.get("/:id", getMovieDetail);
router.post("/add", addMovie);
router.put("/edit", editMovie);

module.exports = router;
