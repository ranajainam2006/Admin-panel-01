const Category = require("../Model/category.model");
const { createModel, viewModel, updateModel, trashModel } = require("../utils/commonModel");

exports.store = async (req, res) => {
  const { name, status } = req.body;
  const result = await createModel(
    Category,
    { name, status },
    "Category Added"
  );
  res.json(result)
};

exports.index = async (req, res) => {
  const result = await viewModel(Category)
  res.json(result)
}

exports.updateCategory = async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const category = await updateModel(Category, id, { name }, "Category Updated!")
  res.json({
    category
  })
}

exports.trashCategory = async (req, res) => {
  const { id } = req.params
  const category = await trashModel(Category, id, "Category Deleted!")

  res.json({
    category
  })
}

exports.singleCategory = async (req, res) => {
  const { id } = req.params

  const category = await Category.findById(id)

  res.json({
    category,
    message: "Single Category!"
  })
}