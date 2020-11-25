const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controller/auth");
const { validateSignupRequest, isRequestValidates, validateSigninRequest } = require("../validators/auth");

router.post("/signup", validateSignupRequest, isRequestValidates, signup);
router.post("/signin", validateSigninRequest, isRequestValidates, signin);


module.exports = router;
