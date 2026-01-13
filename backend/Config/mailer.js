const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASS,
    },
});

exports.sendMailer = async (to, subject, html) => {
    const mymail = process.env.MY_EMAIL
    try {
        const option = {
            from: mymail,
            to,
            subject,
            html,
        };

        await transporter.sendMail(option);
        console.log("OTP Mail Sent Successfully");
    } catch (error) {
        console.log("Mail Error:", error);
    }
};
