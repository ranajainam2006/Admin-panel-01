const SubCategory = require("../Model/subcategory.model");
const { createModel, viewPopulateModel, updateModel, trashModel } = require("../utils/commonModel");

exports.store = async (req, res) => {
  const { category_id, sub_name, status } = req.body;
  const result = await createModel(
    SubCategory,
    { category_id, sub_name, status },
    "Subcategory Added"
  );
  res.json(result)
};

exports.index = async (req, res) => {
  const result = await viewPopulateModel(SubCategory, "category_id", "name status")

  res.json(result)
}


exports.updateSubCategory = async (req, res) => {
  const { id } = req.params
  const { category_id, sub_name } = req.body
  const subCategory = await updateModel(SubCategory, id, { category_id, sub_name }, "Sub Category Updated!")
  res.json({
    subCategory
  })
}
exports.trashSubCategory = async (req, res) => {
  const { id } = req.params
  const subCategory = await trashModel(SubCategory, id, "Sub Category Deleted!")
  res.json({
    subCategory
  })
}
exports.singleSbCategory = async (req, res) => {
  const { id } = req.params
  const subCategory = await SubCategory.findById(id)
  res.json({
    subCategory
  })
}