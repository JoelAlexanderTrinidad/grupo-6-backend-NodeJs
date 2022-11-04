const express = require('express')
const usersRouter = require('./users')
const routerPostTransactions = require('./transactions')

const router = express.Router()

// example of a route with index controller get function
router.use('/users', usersRouter)
router.use('/transactions', routerPostTransactions )
module.exports = router
