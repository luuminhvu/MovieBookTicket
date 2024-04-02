const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUserInfo,
  updateUserInfo,
  updateAvatarUser,
  updateUserPassword,
} = require("../controllers/user.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/profile", getUserInfo);
router.put("/profile/updateavatar", updateAvatarUser);
router.put("/profile", updateUserInfo);
router.post("/profile/updatepassword", updateUserPassword);

module.exports = router;
