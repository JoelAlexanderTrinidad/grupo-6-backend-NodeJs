const express = require('express')
const {
    getCategoriesById,getCategories
} = require('../controllers/categories')

const router = express.Router()

router.get('/', getCategories)
router.get('/:id', getCategoriesById)

module.exports = router