const express = require('express')
const {
   login
} = require('../controllers/auth')
const { loginValidationSchema } = require('../schemas/usersValidation')
const validator = require('../middlewares/validator')

const router = express.Router()

router.post('/login', validator(loginValidationSchema), login)

module.exports = router