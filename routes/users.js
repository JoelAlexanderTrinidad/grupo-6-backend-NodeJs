const express = require('express');
const { get } = require('../controllers/users');

const router = express.Router();

//Apply protectTokenMiddleware
router.use(protectToken);
//routes affeceted for protectToken
router.get('/', users);
router.get('/:id', userById);
router.put('/:id', put);
router.delete('/:id', deleteUser);
