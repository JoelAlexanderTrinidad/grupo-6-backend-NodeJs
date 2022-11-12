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
 /
* @swagger
* /categories/{id}:
*  get:
*    summary: Find transaction by ID
*    tags: [categories]
*    parameters:
*       - name: id
*         in: path
*         description: ID of categories to return
*         required: true
*         schema:
*           type: integer
*           format: int64
*    responses:
*        '200':
*          description: successfuly operation
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/categories'
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/categories'
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: categories not found
*        '500':
*          description: error of server
*    security:
*     - ApiKeyAuth: []
*/
/**
 /
* @swagger
* /categories/{id}:
*  delete:
*    summary: Find categories by ID
*    tags: [categories]
*    parameters:
*       - name: id
*         in: path
*         description: ID of categories to return
*         required: true
*         schema:
*           type: integer
*           format: int64
*    responses:
*        '200':
*          description: successfuly operation
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/categories'
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/categories'
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: categories not found
*        '500':
*          description: error of server
*    security:
*     - ApiKeyAuth: []
*/

router.get("/", getCategories);

router.delete("/:id", deleteCategory);

router.get("/:id", getCategoriesById);

module.exports = router;
