const express = require("express");

//controllers
const { get } = require("../controllers/users");

const router = express.Router();

router.get("/", get);

module.exports = router;
