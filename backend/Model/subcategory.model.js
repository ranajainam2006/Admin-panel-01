const { Schema, model } = require("mongoose");
const { commonString } = require("./common.model");

const subCategorySchema = new Schema(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    sub_name: {
      ...commonString,
      unique: [true, 'Subcategory Already Exist!']
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const SubCategory = model("SubCategory", subCategorySchema);
module.exports = SubCategory;