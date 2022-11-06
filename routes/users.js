const express = require("express");
const { postValidationSchema } = require('../schemas/usersValidation')
const validator = require('../middlewares/validator')

//controllers
const { users, userById, post, put, deleteUser } = require("../controllers/users");

const router = express.Router();

router.get("/", users);
router.get("/:id", userById);
router.post('/', validator(postValidationSchema), post)
router.put('/:id', put)
router.delete('/:id', deleteUser)

module.exports = router


