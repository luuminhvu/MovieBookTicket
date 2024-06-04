const express = require("express");
const router = express.Router();

const {
  createPaymentRequest,
  getRequestReturn,
  createPaymentRequestMomo,
  getRequestReturnMomo,
} = require("../controllers/payment.controller");
const { checkSeats } = require("../middlewares/checkSeat");
const { isUser } = require("../middlewares/auth");
router.post("/", isUser, [checkSeats, createPaymentRequest]);
router.post("/return", isUser, getRequestReturn);
router.post("/momo", isUser, [checkSeats, createPaymentRequestMomo]);
router.post("/return/momo", isUser, getRequestReturnMomo);

module.exports = router;
