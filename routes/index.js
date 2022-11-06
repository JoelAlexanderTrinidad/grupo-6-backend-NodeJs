const express = require('express')
const usersRouter = require('./users')
const transactionsRouter = require('./transactions')
const routerCategories = require("./categories");
const authRouter = require('./auth')

const router = express.Router();

router.use('/users', usersRouter)
router.use('/transactions', transactionsRouter)
router.use("/categories", routerCategories);
router.use('/auth', authRouter)


module.exports = router


