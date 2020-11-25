const express = require("express");
const router = express.Router();
const { addCategory, getCategories } = require("../controller/category");
const { requireSignin, adminMiddleware } = require("../middleware");

router.post("/category", requireSignin, adminMiddleware, addCategory);
router.get("/category", getCategories);

module.exports = router;
