const express = require("express");
const router = express.Router();

const { getMovies } = require("../controllers/movie.controller");

router.get("/", getMovies);

module.exports = router;
