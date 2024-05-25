const express = require("express");
const router = express.Router();

const {
  createPaymentRequest,
  getRequestReturn,
  createPaymentRequestMomo,
  getRequestReturnMomo,
} = require("../controllers/payment.controller");
router.post("/", createPaymentRequest);
router.post("/return", getRequestReturn);
router.post("/momo", createPaymentRequestMomo);
router.post("/return/momo", getRequestReturnMomo);

module.exports = router;
