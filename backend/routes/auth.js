const {
  login,
  Signup,
  getAllUsers,
  setAvatar,
  logout,
  forgotPassword,
} = require("../controller/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/signup", Signup);
router.post("/forgotpassword", forgotPassword);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.post("/logout/:id", logout);

module.exports = router;
