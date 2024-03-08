const express = require("express");
const router = express.Router();

const {
  getMovies,
  getMovieDetail,
} = require("../controllers/movie.controller");

router.get("/", getMovies);
router.get("/:id", getMovieDetail);

module.exports = router;
