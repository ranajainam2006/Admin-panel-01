const { signup, verifyOtp, signin, logout } = require("../Controller/user.controller")

const router = require("express").Router()

router.post("/signup", signup)
router.post("/verifyOtp", verifyOtp)
router.post("/signin", signin)
router.get("/logout", logout)

module.exports = router