const express = require('express')
const { get, getTransaction } = require('../controllers/transactions')

const router = express.Router()

router
    .get('/', get)
    .get('/:id', getTransaction)

module.exports = router