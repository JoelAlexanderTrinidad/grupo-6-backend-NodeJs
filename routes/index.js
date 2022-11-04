const express = require("express");
const usersRouter = require("./users");

const router = express.Router();

// example of a route with index controller get function
router.use("/", usersRouter);

module.exports = router;
