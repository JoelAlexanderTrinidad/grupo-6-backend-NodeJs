const express = require('express');

const {
  get,
  getTransaction,

  post,
} = require('../controllers/transactions');

const router = express.Router();

router.get('/?', get).get('/:id', getTransaction).post('/', post);

module.exports = router;
