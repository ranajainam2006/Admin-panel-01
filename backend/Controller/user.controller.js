const User = require("../Model/user.model");
const { PlainToHash, HashToPlain } = require("../utils/password");
const otpGenerator = require("otp-generator");
const MailSendUI = require("../utils/MailSendUI");
const { sendMailer } = require("../Config/mailer");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.json({
        success: false,
        message: "Email already exists"
      });
    }

    const hash_pass = await PlainToHash(password);

    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const user = await User.create({
      name,
      email,
      password: hash_pass,
      mobile,
      otp,
      verify: false
    });

    await sendMailer(email, "Verify Your Email", MailSendUI(otp));

    res.json({
      success: true,
      message: "Signup successfully, OTP sent to email",
      user
    });

  } catch (err) {
    res.json({
      success: false,
      message: err.message
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    const user = await User.findOne({ otp });

    if (!user) {
      return res.json({
        success: false,
        message: "OTP not matched"
      });
    }

    await User.findByIdAndUpdate(user._id, { otp: "", verify: true })

    res.json({
      success: true,
      message: "Your account is verified"
    });

  } catch (err) {
    res.json({
      success: false,
      message: err.message
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, verify: true });


    if (!user) {
      return res.json({
        success: false,
        message: "Email not found or not verified"
      });
    }

    const matchPass = await HashToPlain(password, user.password);

    if (!matchPass) {
      return res.json({
        success: false,
        message: "Password not matched"
      });
    }

    req.session.user = {
      id: user._id,
      email: user.email
    };

    res.json({
      success: true,
      message: "Login successfully"
    });

  } catch (err) {
    res.json({
      success: false,
      message: err.message
    });
  }
};

exports.logout = async (req, res) => {
  req.session = null

  res.json({
    success: true,
    message: "You are Successfully Logout!"
  })
}