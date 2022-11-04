const { postTransactions, putTransactions } = require('../controllers/transactions')

const router = require('express').Router()


router.post('/', postTransactions)
router.put('/:id', putTransactions)

module.exports =  router