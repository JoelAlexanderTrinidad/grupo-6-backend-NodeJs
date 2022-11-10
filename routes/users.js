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
*  delete:
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
router.get("/", users);
router.get("/:id", userById);
router.post('/', validator(postValidationSchema), post)
router.put('/:id', put)
router.delete('/:id', deleteUser)

module.exports = router


