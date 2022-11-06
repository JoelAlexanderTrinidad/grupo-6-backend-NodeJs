const express = require("express");

//controllers
const { users, userById, post, put, deleteUser } = require("../controllers/users");

const router = express.Router();

router.get("/", users);
router.get("/:id", userById);
router.post('/', post)
router.put('/:id', put)
router.delete('/:id', deleteUser)

module.exports = router


