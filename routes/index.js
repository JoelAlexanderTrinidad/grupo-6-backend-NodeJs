const express = require('express')
const usersRouter = require('./users')
const routerPostTransactions = require('./transactions')
const routerCategories = require('./categories')

const authRouter = require('./auth')

const router = express.Router()

// example of a route with index controller get function
router.use('/users', usersRouter)
router.use('/transactions', routerPostTransactions )
router.use('/categories', routerCategories)


router.use('/auth', authRouter)

module.exports = router
