// const jwt = require("jsonwebtoken")

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    try {

        if (!token) {
            return res.json({
                success: false,
                message: "You are not authenticate!"
            })
        }

        let newToken = token.slice(7)
        // let newToken = token.split(" ")[1]
        const secretkey = process.env.SECRET_KEY
        const verifytoken = jwt.verify(newToken, secretkey)

        if (!verifytoken) {
            res.json({
                success: false,
                message: "You are not authenticate!"
            })
        }

        req.user = verifytoken

        next()

    } catch (error) {
        res.json({
            message: error.message || "Server Error"
        })

    }
}