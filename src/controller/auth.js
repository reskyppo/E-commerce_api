const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (user) {
    return res.status(400).json({
      message: "user already exist",
    });
  }

  const { firstName, lastName, email, password } = req.body;
  const _user = new User({
    firstName,
    lastName,
    email,
    password,
    username: Math.random().toString(),
  });

  _user.save((err, data) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    if (data) {
      return res.status(201).json({ data: data });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return res.status(400).json({ message: err });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          data: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({ message: "Invalid Password" });
      }
    } else {
      return res.status(400).json({ message: "Something when wrong" });
    }
  });
};

exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization;
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};
