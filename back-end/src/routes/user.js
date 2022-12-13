const express = require("express");
const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
  uploadCloud,
} = require("../common-middleware");
const {
  updateUser,
  getUsers,
  setDisableUser,
  updateUserInfo,
} = require("../controllers/user");

const router = express.Router();

router.post("/update", requireSignin, adminMiddleware, updateUser);
router.post(
  "/updateUserInfo",
  requireSignin,
  userMiddleware,
  uploadCloud.single("profilePicture"),
  updateUserInfo
);
router.post("/setDisableUser", requireSignin, adminMiddleware, setDisableUser);
router.post("/getUsers", getUsers);
module.exports = router;
