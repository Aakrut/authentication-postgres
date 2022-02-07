const express = require("express");
const { signUp, login, logout } = require("../controller/user");
const router = express.Router();
const { validate } = require("../middlewares/auth");

router.route("/register").post(signUp);
router.route("/login").post(login);
router.route("/logout").post(validate, logout);

module.exports = router;
