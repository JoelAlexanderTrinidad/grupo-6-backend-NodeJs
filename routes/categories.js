//controllers
const { deleteCategory } = require('../controllers/categories');

const { protectToken } = require('../middlewares/protectTokenMiddleware');

const router = require('express').Router();

//Apply protectTokenMiddleware
router.use(protectToken);
//routes affeceted for protectToken
router.delete('/:id', deleteCategory);

module.exports = router;
