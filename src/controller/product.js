const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");

exports.createProduct = (req, res) => {
  const { name, price, description, category, stock, createdBy } = req.body;

  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    description,
    stock,
    productPictures,
    category,
    createdBy: req.user._id,
  });

  product.save((err, product) => {
    if (err) return res.status(400).json({ message: err });
    if (product) return res.json({ data: product });
  });
};
