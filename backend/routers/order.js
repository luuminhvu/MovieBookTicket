const express = require("express");
const router = express.Router();

const { getOrderByUser } = require("../controllers/order.controller");

router.get("/", getOrderByUser);

module.exports = router;
