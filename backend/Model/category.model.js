const { Schema, model } = require("mongoose");
const { common, commonString } = require("./common.model");

const categorySchema = new Schema({
    name: {
        ...commonString,
        unique: [true, "Category Already Exist"]
    },
    status: {
        ...common,
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const Category = model('Category', categorySchema)
module.exports = Category