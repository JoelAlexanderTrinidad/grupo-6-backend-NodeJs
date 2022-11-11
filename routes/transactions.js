
const express = require('express')


const router = require('express').Router()

const {
  get,
  getTransaction,
  post,
  deleteTransaction,
} = require("../controllers/transactions");

router
    .get('/?', get)
    .get('/:id', getTransaction)
    .post("/", post)
    .delete("/:id",deleteTransaction)

module.exports = router
