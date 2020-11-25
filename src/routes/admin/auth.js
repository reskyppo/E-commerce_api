const express = require("express");
const router = express.Router();
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidates,
} = require("../../validators/auth");

const {
  signup,
  signin,
} = require("../../controller/admin/auth");

router.post("/admin/signup", validateSignupRequest, isRequestValidates, signup);
router.post("/admin/signin", validateSigninRequest, isRequestValidates, signin);

module.exports = router;
