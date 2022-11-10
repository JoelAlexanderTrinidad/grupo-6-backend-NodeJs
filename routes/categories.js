const express = require("express");
const {
  getCategories,
  deleteCategory,
  getCategoriesById,
} = require("../controllers/categories");

const router = express.Router();
/**
 * /
 * @swagger
 * components:
 *  schemas:
 *    category:
 *      type: object
 *      requires:
 *        -name
 *        -description
 *      properties:
 *        description:
 *          type: string
 *          description: This is the description of the category
 *        name:
 *          type: string
 *          description: This is the name of the category
 *        deletedAt:
 *          type: date
 *          description: This is the date of delete of the transaction
 * 
 */
/**
 /
* @swagger
* /categories:
*  get:
*    summary: returns the list of all categories
*    tags: [categories]
*    responses:
*      200:
*         description: the list of categories
*         content:
*            application/json:
*              schema:
*                type: array
*                items:
*                  $ref: '#/components/schemas/category'
*    security:
*     - ApiKeyAuth: []

*/
/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Retrieve from controllers
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *
 */
/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Retrieve from controllers
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *
 */
router.get("/", getCategories);

router.delete("/:id", deleteCategory);

router.get("/:id", getCategoriesById);

module.exports = router;
