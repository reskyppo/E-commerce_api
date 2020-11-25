const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("firstName is required"),
  check("lastName").notEmpty().withMessage("lastName is required"),
  check("email").isEmail().withMessage("Valid email format is required"),
  check("password").isLength({ min: 6 }).withMessage("password is required"),
];

exports.validateSigninRequest = [
  check("email").isEmail().withMessage("Valid email format is required"),
  check("password").isLength({ min: 6 }).withMessage("password is required"),
];

exports.isRequestValidates = (req, res, next) => {
  const err = validationResult(req);
  if (err.array().length > 0) {
    return res.status(400).json({ message: err.array() });
  }
  next();
};
