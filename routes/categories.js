
const express = require('express')
const {
    getCategoriesById, getCategories, deleteCategory
} = require('../controllers/categories')

const router = express.Router()

router.get('/', getCategories)
router.delete("/:id", deleteCategory);

module.exports = router
