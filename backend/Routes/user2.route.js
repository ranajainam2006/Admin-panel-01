const { signup, verifyOtp, signin } = require("../Controller/user.controller")

const router = require("express").Router()

router.post("/signup", signup)
router.post("/verifyOtp", verifyOtp)
router.post("/signin", signin)

module.exports = router