const express = require("express");
const router = express.Router();

const {
  getOrderByUser,
  getOrders,
} = require("../controllers/order.controller");

router.get("/all", getOrders);
router.post("/", getOrderByUser);

module.exports = router;
