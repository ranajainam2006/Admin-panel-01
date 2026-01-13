const { store, index, productUpdate, productTrash, productSingle } = require('../Controller/product.controller')
const upload = require("../middleware/upload")

const router = require('express').Router()

router
    .route('/')
    .post(upload.single('p_image'), store)
    .get(index)

router.put("/:id", upload.single('p_image'), productUpdate)
router.delete("/:id", productTrash)
router.get("/:id", productSingle)

module.exports = router