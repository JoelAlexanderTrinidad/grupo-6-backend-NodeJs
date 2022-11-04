const express = require('express')
const { get, getTransaction, getTransactionUser } = require('../controllers/transactions')

const router = express.Router()

/* /transitions */
router
    .get('/?', get)
    .get('/:id', getTransaction)

module.exports = router