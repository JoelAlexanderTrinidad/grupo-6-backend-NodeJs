const express = require('express');

//midlewares
const { protectToken } = require('../middlewares/protectTokenMiddleware');

//controllers
const {
  users,
  userById,
  post,
  put,
  deleteUser,
} = require('../controllers/users');

const router = express.Router();


//Apply protectTokenMiddleware
// router.use(protectToken);
//routes affeceted for protectToken
router.get('/', users);
router.post('/', post);
router.get('/:id', userById);
router.put('/:id', put);
router.delete('/:id', deleteUser);

module.exports = router;
