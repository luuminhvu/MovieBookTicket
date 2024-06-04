const express = require("express");
const router = express.Router();

const {
  getOrderByUser,
  getOrders,
} = require("../controllers/order.controller");
const { isAdmin, isUser } = require("../middlewares/auth");

router.get("/all", isAdmin, getOrders);
router.post("/", isUser, getOrderByUser);

module.exports = router;
