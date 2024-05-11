const express = require("express");
const router = express.Router();

const { verifyTokenGoogle } = require("../controllers/auth.controller");

router.post("/verify-google", verifyTokenGoogle);

module.exports = router;
