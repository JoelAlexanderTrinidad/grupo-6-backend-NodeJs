const express = require('express')
const {
   get, post, put, deleteUser
} = require('../controllers/users')
const { postValidationSchema } = require('../schemas/usersValidation')
const validator = require('../middlewares/validator')

const router = express.Router()

router.get('/', get)

router.post('/', validator(postValidationSchema), post)
router.put('/:id', put)
router.delete('/:id', deleteUser)

module.exports = router