const express = require("express");
const router = express.Router();

const {
  createPaymentRequest,
  getRequestReturn,
} = require("../controllers/payment.controller");
router.post("/", createPaymentRequest);
router.post("/return", getRequestReturn);

module.exports = router;
