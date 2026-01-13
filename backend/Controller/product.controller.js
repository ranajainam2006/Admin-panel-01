const Product = require("../Model/product.model");
const { createModel, viewMorePopulateModel, updateModel, trashModel } = require("../utils/commonModel");;

exports.store = async (req, res) => {
  const { category_id, subcategory_id, p_name, p_price, status } = req.body;
  const result = await createModel(
    Product,
    { category_id, subcategory_id, p_name, p_price, status, p_image: req?.file?.filename },
    "Product Added"
  );
  res.json(result)
};

exports.index = async (req, res) => {
  const result = await viewMorePopulateModel(Product, "category_id", "name", "subcategory_id", "sub_name")
  res.json(result)
}

exports.productUpdate = async (req, res) => {
  const { id } = req.params
  const { category_id, subcategory_id, p_name, p_price } = req.body

  const updateData = { category_id, subcategory_id, p_name, p_price }

  if (req?.file?.filename) {
    updateData.p_image = req.file.filename
  }

  const product = await updateModel(Product, id, updateData, "Product Updated!")

  res.json({
    product
  })
}
exports.productTrash = async (req, res) => {
  const { id } = req.params
  const product = await trashModel(Product, id, "Product Deleted!")

  res.json({
    product
  })
}
exports.productSingle = async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id).populate("category_id").populate("subcategory_id")
  await product.save();
  res.json({
    product
  })
}