const { postCategories, putCategories } = require('../controllers/categories')

const router = require('express').Router()


router.post('/', postCategories)
router.put('/:id', putCategories)

module.exports = router