const express = require("express");
const router = express.Router();

const {
  getOrderByUser,
  getOrders,
} = require("../controllers/order.controller");

router.post("/", getOrderByUser);
router.get("/all", getOrders);

module.exports = router;
