const express = require("express");
const {
  getCategories,
  deleteCategory,
  getCategoriesById,
  postCategories,
  putCategories
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
/**
 * @swagger
 *  /categories/{id}:
 *   put:
 *    summary: create a new categories
 *    tags: [categories]
 *    parameters:
*       - name: id
*         in: path
*         description: ID of categories to return
*         required: true
*         schema:
*           type: integer
*           format: int64
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        $ref: '#components/schemas/categories'
 *    responses:
 *     200:
 *      description: A new categories has been created!
 */
/**
 * @swagger
 *  /categories:
 *   post:
 *    summary: create a new categories
 *    tags: [categories]
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        $ref: '#components/schemas/categories'
 *    responses:
 *     200:
 *      description: A new categories has been created!
 */
router.get('/', getCategories)
router.get('/:id', getCategoriesById)
router.delete("/:id", deleteCategory);
router.post('/', postCategories)
router.put('/:id', putCategories)


module.exports = router;
