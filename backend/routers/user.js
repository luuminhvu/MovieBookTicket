const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUserInfo,
  updateUserInfo,
  updateAvatarUser,
  updateUserPassword,
  getUser,
  updateUserForAdmin,
  activeAccount,
} = require("../controllers/user.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/profile/updatepassword", updateUserPassword);
router.post("/profile", getUserInfo);
router.put("/profile/updateavatar", updateAvatarUser);
router.put("/profile", updateUserInfo);
router.get("/", getUser);
router.put("/", updateUserForAdmin);
router.patch("/active/:token", activeAccount);
module.exports = router;
