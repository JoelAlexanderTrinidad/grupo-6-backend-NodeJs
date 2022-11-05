const express = require('express')
const {
    getCategoriesById,getCategories
} = require('../controllers/categories')

const router = express.Router()

router.get('/', getCategories)


module.exports = router