const common = {
    trim: true,
    required: true
}

exports.commonString = {
    type: String,
    ...common
}
exports.commonNumber = {
    type: Number,
    ...common
}