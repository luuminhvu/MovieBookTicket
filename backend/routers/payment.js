const express = require("express");
const router = express.Router();

const {
  createPaymentRequest,
  getRequestReturn,
  createPaymentRequestMomo,
  getRequestReturnMomo,
} = require("../controllers/payment.controller");
const { checkSeats } = require("../middlewares/checkSeat");
router.post("/", [checkSeats, createPaymentRequest]);
router.post("/return", getRequestReturn);
router.post("/momo", [checkSeats, createPaymentRequestMomo]);
router.post("/return/momo", getRequestReturnMomo);

module.exports = router;
