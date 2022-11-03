const express = require('express')
const {
   get, post, put, deleteUser
} = require('../controllers/users')

const router = express.Router()

router.get('/', get)

router.post('/', post)
router.put('/:id', put)
router.delete('/:id', deleteUser)

module.exports = router