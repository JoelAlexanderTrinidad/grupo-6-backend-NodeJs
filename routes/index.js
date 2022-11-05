const express = require("express");

const routerCategories = require("./categories");

const router = express.Router();

// example of a route with index controller get function
router.use("/categories", routerCategories);

module.exports = router;
