const express = require('express')
const {
  get,
  getTransaction,
  getTransactionUser,
  post,
} = require("../controllers/transactions");

const router = express.Router()

/* /transitions */
router
    .get('/?', get)
    .get('/:id', getTransaction)
    router.post("/", post);

module.exports = router