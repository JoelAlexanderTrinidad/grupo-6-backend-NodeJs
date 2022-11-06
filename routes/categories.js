//controllers
const { deleteCategory } = require("../controllers/categories");

const router = require("express").Router();

router.delete("/:id", deleteCategory);

module.exports = router;
