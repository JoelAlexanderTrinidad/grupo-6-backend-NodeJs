
const express = require('express')
const router = express.Router();

const usersRouter = require('./users')
const categoriesRouter = require('./categories')
const transactionsRouter = require('./transactions')
const authRouter = require('./auth')
//const docRouter = require('./api-docs.js')


router.use('/users', usersRouter)
router.use('/transactions', transactionsRouter)
router.use('/categories', categoriesRouter)
router.use('/auth', authRouter)
//router.use('/api/docs', docRouter)

module.exports = router