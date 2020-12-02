const express = require("express");
const { addItemToCart } = require("../controller/cart");
const router = express.Router();
const { requireSignin, userMiddleware } = require("../middleware");

router.post("/cart", requireSignin, userMiddleware,addItemToCart);
// router.get("/category", getCategories);

module.exports = router;
