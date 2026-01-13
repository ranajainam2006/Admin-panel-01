const { sendMailer } = require("../Config/mailer")
const User = require("../Model/user.model")
const { createModel, existModel } = require("../utils/commonModel")
const { PlainToHash, HashToPlain } = require("../utils/password")
const otpGenerator = require("otp-generator")
const sendMail = require("../utils/sendMail")
// const jwt = require("jsonwebtoken")


exports.signup = async (req, res) => {
    const { name, email, password, mobile } = req.body
    const hash_pass = await PlainToHash(password)

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false })

    const user = await createModel(User, { name, email, password: hash_pass, mobile, otp }, "User Signup Successfully!")



    if (user) {
        await sendMailer(email, "Verify Your Email", sendMail(otp))
    }

    res.json({
        success: true,
        user
    })
}

exports.verifyOtp = async (req, res) => {
    const { otp } = req.body

    const matchOtp = await User.findOne({ otp })

    if (!matchOtp) {
        return res.json({
            success: false,
            message: "Otp Not Match!"
        })
    }

    await User.findByIdAndUpdate({ _id: matchOtp._id }, { otp: "", verify: true })

    res.json({
        success: true,
        message: "Your Account is Verify!"
    })
}

exports.signin = async (req, res) => {
    const { email, password } = req.body

    const match = await existModel(User, { email, verify: true }, "Email Id not Exist!")

    const { _id: id, email: u_email } = match.records

    if (match.success) {
        const hash_pass = match.records.password
        const matchPass = await HashToPlain(password, hash_pass)

        if (!matchPass) {
            res.json({
                success: false,
                message: "Password Not Match!"
            })
        }

        const payload = {
            id, u_email
        }

        const secretkey = process.env.SECRET_KEY

        const token = jwt.sign(payload, secretkey, { expiresIn: "1h" })

        res
            .header({ token })
            .json({
                success: true,
                message: "Login Successfully!",
                token
            })

    } else {
        res.json(match)
    }
}