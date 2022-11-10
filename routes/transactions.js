const express = require('express')
const {
  get,
  getTransaction,
  post,
  deleteTransaction,
} = require("../controllers/transactions");

const router = express.Router()
/**
 * /
 * @swagger
 * components:
 *  schemas:
 *    transactions:
 *      type: object
 *      requires:
 *        -name
 *        -description
 *      properties:
 *        description:
 *          type: string
 *          description: This is the description of the transaction
 *        name:
 *          type: string
 *          description: transaction
 *        deletedAt:
 *          type: date
 *          description: This is the date of delete of the transaction
 * 
 */
/**
 /
* @swagger
* /transactions:
*  get:
*    summary: returns the list of all  transactions 
*    tags: [transactions]
*    responses:
*      200:
*         description: the list of all transactions
*         content:
*            application/json:
*              schema:
*                type: array
*                items:
*                  $ref: '#/components/schemas/transactions'
*    security:
*     - ApiKeyAuth: []
*/
/**
 /
* @swagger
* /transactions/{id}:
*  delete:
*    summary: returns the list of all  transactions 
*    tags: [transactions]
*    responses:
*      200:
*         description: the list of all transactions
*         content:
*            application/json:
*              schema:
*                type: array
*                items:
*                  $ref: '#/components/schemas/transactions'
*    security:
*     - ApiKeyAuth: []
*/
/**
 /
* @swagger
* /transactions/{id}:
*  get:
*    summary: returns the list of all  transactions 
*    tags: [transactions]
*    responses:
*      200:
*         description: the list of all transactions
*         content:
*            application/json:
*              schema:
*                type: array
*                items:
*                  $ref: '#/components/schemas/transactions'
*    security:
*     - ApiKeyAuth: []
*/
router
    .get('/?', get)
    .get('/:id', getTransaction)
    .post("/", post)
    .delete("/:id",deleteTransaction)

module.exports = router