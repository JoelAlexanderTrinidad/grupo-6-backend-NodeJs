
const express = require('express')
const {
     getCategories, deleteCategory, getCategoriesById
    } = require('../controllers/categories')

const router = express.Router()

router.get('/', getCategories)


router.delete("/:id", deleteCategory);

router.get('/:id', getCategoriesById)


module.exports = router
