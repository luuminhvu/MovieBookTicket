const express = require("express");
const router = express.Router();

const {
  getVoucher,
  getVoucherByID,
  addVoucher,
  updateVoucher,
  deleteVoucher,
  deleteUserVoucher,
} = require("../controllers/voucher.controller");

router.get("/:id", getVoucherByID);
router.get("/", getVoucher);
router.post("/add", addVoucher);
router.put("/:id", updateVoucher);
router.delete("/:id", deleteVoucher);
router.delete("/", deleteUserVoucher);

module.exports = router;
