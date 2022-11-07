const express = require('express')

const usersRouter = require('./users')
<<<<<<< HEAD
const categoriesRouter = require('./categories')
=======

const categoriesRouter = require('./categories')
const transactionsRouter = require('./transactions')
>>>>>>> 2767a78e3e06223076a45aebd540905e7e94d74d
const authRouter = require('./auth')

const transactionsRouter = require('./transactions')

<<<<<<< HEAD
// example of a route with index controller get function
router.use('/users', usersRouter)
=======

const router = express.Router();

router.use('/users', usersRouter)
router.use('/transactions', transactionsRouter)

>>>>>>> 2767a78e3e06223076a45aebd540905e7e94d74d
router.use('/categories', categoriesRouter)
router.use('/auth', authRouter)


module.exports = router