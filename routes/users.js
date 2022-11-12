const express = require("express");
const { postValidationSchema } = require('../schemas/usersValidation')
const validator = require('../middlewares/validator')

//controllers
const { users, userById, post, put, deleteUser } = require("../controllers/users");

const router = express.Router();
/**
 * /
 * @swagger
 * components:
 *  schemas:
 *    users:
 *      type: object
 *      requires:
 *        -name
 *        -description
 *      properties:
 *        description:
 *          type: string
 *          description: This is the description of the user
 *        name:
 *          type: string
 *          description: user
 *        deletedAt:
 *          type: date
 *          description: This is the date of delete of the user
 * 
 */
/**
 /
* @swagger
* /users:
*  get:
*    summary: returns the list of all  users 
*    tags: [users]
*    responses:
*      200:
*         description: the list of all users
*         content:
*            application/json:
*              schema:
*                type: array
*                items:
*                  $ref: '#/components/schemas/users'
*    security:
*     - ApiKeyAuth: []
*/
/**
 /
* @swagger
* /users/{id}:
*  get:
*    summary: Find users by ID
*    tags: [users]
*    parameters:
*       - name: id
*         in: path
*         description: ID of users to return
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
*                $ref: '#/components/schemas/users'
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/users'
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: users not found
*        '500':
*          description: error of server
*    security:
*     - ApiKeyAuth: []
*/
/**
 /
* @swagger
* /users/{id}:
*  delete:
*    summary: Find users by ID
*    tags: [users]
*    parameters:
*       - name: id
*         in: path
*         description: ID of users to return
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
*                $ref: '#/components/schemas/users'
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/users'
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: users not found
*        '500':
*          description: error of server
*    security:
*     - ApiKeyAuth: []
*/
/**
 * @swagger
 *  /users:
 *   post:
 *    summary: create a new user
 *    tags: [users]
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        $ref: '#components/schemas/users'
 *    responses:
 *     200:
 *      description: A new transaction has been created!
 */
/**
 * @swagger
 *  /users/{id}:
 *   put:
 *    summary: create a new user
 *    tags: [users]
 *    parameters:
*       - name: id
*         in: path
*         description: ID of users to return
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
 *        $ref: '#components/schemas/users'
 *    responses:
 *     200:
 *      description: A new transaction has been created!
 */
router.get("/", users);
router.get("/:id", userById);
router.post('/', validator(postValidationSchema), post)
router.put('/:id', put)
router.delete('/:id', deleteUser)

module.exports = router


