const router = require('express').Router()
const { postCategories, putCategories, getCategories, deleteCategory, getCategoriesById } = require('../controllers/categories')

router.get('/', getCategories)
router.get('/:id', getCategoriesById)

router.delete("/:id", deleteCategory);
router.post('/', postCategories)
router.put('/:id', putCategories)


router.get('/:id', getCategoriesById)


module.exports = router
