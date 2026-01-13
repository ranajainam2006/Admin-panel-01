const bcrypt = require("bcryptjs")

exports.PlainToHash = async (password) => {
    const solt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, solt)
}

exports.HashToPlain = async (password, hash_pass) => {
    return await bcrypt.compare(password, hash_pass)
}