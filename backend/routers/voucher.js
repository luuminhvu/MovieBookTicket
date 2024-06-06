const express = require("express");
const router = express.Router();

const {
  getVoucher,
  getVoucherByID,
  addVoucher,
  updateVoucher,
  deleteVoucher,
  deleteUserVoucher,
  getAllUserVoucher,
  addVoucherToUser,
} = require("../controllers/voucher.controller");

router.get("/:id", getVoucherByID);
router.get("/", getVoucher);
router.post("/add", addVoucher);
router.put("/:id", updateVoucher);
router.delete("/:id", deleteVoucher);
router.delete("/user/:id", deleteUserVoucher);
router.get("/user/all", getAllUserVoucher);
router.post("/user/add", addVoucherToUser);

module.exports = router;
