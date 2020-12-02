const Cart = require("../models/cart");

exports.addItemToCart = (req, res) => {
  Cart.find({ user: req.user._id }).exec((err, cart) => {
    console.log(req.body.cartItems.product);
    if (err) return res.status(400).json({ message: err });
    if (cart.length > 0) {
      // update quantoty when cart exist
      const product = req.body.cartItems.product;
      const item = cart[0].cartItems.find((c) => c.product == product);
      console.log(item);
      if (item) {
        Cart.findOneAndUpdate(
          { user: req.user._id, "cartItems.product": product },
          {
            $set: {
              cartItems: {
                ...req.body.cartItems,
                quantity: item.quantity + req.body.cartItems.quantity,
              },
            },
          }
        ).exec((err, _cart) => {
          if (err) return res.status(400).json({ message: err });
          if (_cart) return res.status(200).json({ data: _cart });
        });
      } else {
        Cart.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              cartItems: req.body.cartItems,
            },
          }
        ).exec((err, _cart) => {
          if (err) return res.status(400).json({ message: err });
          if (_cart) return res.status(200).json({ data: _cart });
        });
      }
    } else {
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ data: cart });
        }
      });
    }
  });
};
