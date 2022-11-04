const express = require("express");

//controllers
const { users, userById, post } = require("../controllers/users");

const router = express.Router();

router.get("/users", users);
router.get("/users/:id", userById);
router.post("/users", post);

module.exports = router;
