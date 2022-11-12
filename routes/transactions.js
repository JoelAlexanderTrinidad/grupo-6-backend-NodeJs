const express = require('express')


const router = require('express').Router()

const {
  get,
  getTransaction,
  post,
  deleteTransaction,
} = require("../controllers/transactions");

/**
 * @swagger
 * components:
 *  schemas:
 *    Transactions:
 *      type: object
 *      properties:
 *       description:
 *        type: string
 *        description: A description of a transaction
 *       amount:
 *        type: number
 *        description: A amount
 *       userId:
 *        type: integer
 *        description: A user identifier
 *       categoryId:
 *        type: integer
 *        description: A category identifier
 *       date:
 *        type: string
 *        format: date
 *        description: Date of a transaction
 *       example:
 *        description: this is a transaction description
 *        amount: 2000
 *        userId: 1
 *        categoryId: 2
 *        date: 2022-11-11
 */
/**
 /
* @swagger
* /transactions/:
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
*  get:
*    summary: Find transactions by ID
*    tags: [transactions]
*    parameters:
*       - name: id
*         in: path
*         description: ID of transactions to return
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
*                $ref: '#/components/schemas/transactions'
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/transactions'
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: transactions not found
*        '500':
*          description: error of server
*    security:
*     - ApiKeyAuth: []
*/
/**
 /
* @swagger
* /transactions/{id}:
*  delete:
*    summary: Find transactions by ID
*    tags: [transactions]
*    parameters:
*       - name: id
*         in: path
*         description: ID of transactions to return
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
*                $ref: '#/components/schemas/transactions'
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/transactions'
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: transactions not found
*        '500':
*          description: error of server
*    security:
*     - ApiKeyAuth: []
*/
/**
 * @swagger
 *  /transactions:
 *   post:
 *    summary: create a new transaction
 *    tags: [transactions]
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        $ref: '#components/schemas/transactions'
 *    responses:
 *     200:
 *      description: A new transaction has been created!
 */

router.get("/?", get);
router.get("/:id", getTransaction);
router.post("/", post);
router.delete("/:id", deleteTransaction);

module.exports = router;
