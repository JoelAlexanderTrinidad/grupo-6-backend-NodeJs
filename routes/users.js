const express = require("express");

//controllers
const { users, userById, post } = require("../controllers/users");

const router = express.Router();

router.get("/", users);
router.get("/:id", userById);

module.exports = router;
