const { store, index, updateSubCategory, trashSubCategory,singleSbCategory } = require('../Controller/subcategory.controller')

const router = require('express').Router()

router
    .route('/')
    .post(store)
    .get(index)
    
    router.put("/:id", updateSubCategory)
    router.delete("/:id", trashSubCategory)
    router.get("/:id", singleSbCategory)
module.exports = router