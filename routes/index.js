const express = require('express')
const usersRouter = require('./users')
<<<<<<< HEAD
const categoriesRouter = require('./categories')
=======
const authRouter = require('./auth')

>>>>>>> d48990b5f3ca7d8fc852100b3a9d83233d7a38ec
const router = express.Router()

// example of a route with index controller get function
router.use('/users', usersRouter)
<<<<<<< HEAD
router.use('/categories', categoriesRouter)
=======


router.use('/auth', authRouter)

>>>>>>> d48990b5f3ca7d8fc852100b3a9d83233d7a38ec
module.exports = router
