const Category = require("../models/category");
const slugify = require("slugify");
const { reset } = require("nodemon");
const category = require("../models/category");

const createCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
};

exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cat = new Category(categoryObj);
  cat.save((err, category) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    if (category) {
      return res.status(200).json({ message: category });
    }
  });
};

exports.getCategories = (req, res) => {
  Category.find({}).exec((err, categories) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    if (categories) {
      const categoryList = createCategories(categories);

      return res.json({ data: categoryList });
    }
  });
};
