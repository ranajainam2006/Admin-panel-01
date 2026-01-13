const { Schema, model } = require("mongoose");
const { commonString, commonNumber } = require("./common.model");

const productSchema = new Schema(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    subcategory_id: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    p_name: commonString,
    p_price: commonNumber,
    p_image: {
      ...commonString,
      required: false
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);
module.exports = Product;
