const express = require("express");
const app = express.Router();
const { signup } = require("../controller/user");

app.post("/signin", (req, res) => {});

app.post("/signup", signup);

module.exports = app;
