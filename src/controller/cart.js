const Cart = require("../models/cart");

exports.addItemToCart = (req, res) => {
  Cart.find({ user: req.user._id }).exec((err, cart) => {
    if (err) return res.status(400).json({ message: err });
    if (cart) {
      // update quantity when cart exist

      const product = req.body.cartItems.product;
      const item = cart.cartItems.find((c) => {
        c.product === product;
      });

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

      cart.save((err, cart) => {
        if (err) return res.status(400).json({ message: err });
        if (cart) return res.status(200).json({ message: cart });
      });
    }
  });
};
