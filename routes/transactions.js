const express = require('express')

const {
  get,
  getTransaction,
  getTransactionUser,
  post,
  deleteTransaction,
} = require("../controllers/transactions");

const router = express.Router()

router
    .get('/?', get)
    .get('/:id', getTransaction)
    .post("/", post)
    .delete("/:id",deleteTransaction)

module.exports = router