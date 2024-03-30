const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUserInfo,
} = require("../controllers/user.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/profile", getUserInfo);

module.exports = router;
