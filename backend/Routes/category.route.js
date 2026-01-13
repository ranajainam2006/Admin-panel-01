const { store, index, updateCategory, trashCategory, singleCategory } = require('../Controller/category.controller')
const { verifyToken } = require('../middleware/verify')

const router = require('express').Router()

router
    .route('/')
    // .post(verifyToken, store)
    .post(store)
    .get(index)
router.put("/:id", updateCategory)
router.delete("/:id", trashCategory)
router.get("/:id", singleCategory)

module.exports = router