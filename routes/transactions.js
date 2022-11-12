const express = require('express');

//millewares
const { protectToken } = require('../middlewares/protectTokenMiddleware');

const { get, getTransaction, post } = require('../controllers/transactions');

const router = express.Router();

//Apply protectTokenMiddleware
router.use(protectToken);
//routes affeceted for protectToken

router.get('/?', get).get('/:id', getTransaction).post('/', post);

module.exports = router;
