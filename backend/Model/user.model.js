const { Schema, model } = require("mongoose");
const { common, commonString, commonNumber } = require("./common.model");

const userSchema = new Schema({
    name: commonString,
    email: {
        ...commonString,
        unique: [true, "Email Id Already Exist!"],
    },
    mobile: {
        ...commonNumber,
        unique: [true, "Mobile Number Already Exist!"],
    },
    password: {
        ...commonString,
        required: true
    },
    otp : commonString,
    verify : {
        type : Boolean,
        default :  false,
        required : true
    }
}, { timestamps: true })

const User = model('User', userSchema)
module.exports = User