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
  forgotPassword,
  checkActive,
  requestEmailActive,
} = require("../controllers/user.controller");
const { auth, isAdmin, isUser } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/profile/updatepassword", isUser, updateUserPassword);
router.post("/profile", auth, getUserInfo);
router.put("/profile/updateavatar", auth, updateAvatarUser);
router.put("/profile", isUser, updateUserInfo);
router.get("/", isAdmin, getUser);
router.put("/", isAdmin, updateUserForAdmin);
router.patch("/active/:token", activeAccount);
router.post("/forgotpassword", forgotPassword);
router.post("/checkactive", auth, checkActive);
router.post("/request/active", auth, requestEmailActive);
module.exports = router;
