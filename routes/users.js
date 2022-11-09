const express = require('express');

//controllers
const {
  users,
  userById,
  post,
  put,
  deleteUser,
} = require('../controllers/users');

//helpers
const { upload } = require('../helpers/multer');

const router = express.Router();

router.get('/', users);
router.get('/:id', userById);
//At this route uses a method to upload user image in Firebase service
router.post('/', upload.single('avatar'), post);
router.put('/:id', put);
router.delete('/:id', deleteUser);

module.exports = router;
