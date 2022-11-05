const express = require('express')
const { get,post } = require('../controllers/transactions')

const router = express.Router()

router.get('/', get)
router.post('/', post)

module.exports = router