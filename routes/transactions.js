const express = require('express')
const {
  get,
  getTransaction,
  post,
  deleteTransaction,
} = require("../controllers/transactions");

const router = express.Router()

router
    .get('/?', get)
    .get('/:id', getTransaction)
    .post("/", post)
    .delete("/:id",deleteTransaction)

const { get } = require('../controllers/transactions')

module.exports = router