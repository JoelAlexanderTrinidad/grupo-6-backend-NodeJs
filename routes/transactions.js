const express = require("express");
const router = express.Router();

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


router.get("/?", get);
router.get("/:id", getTransaction);

/**
 * @swagger
 *  /transactions/:
 *   post:
 *    summary: create a new transaction
 *    tags: [Transactions]
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        $ref: '#components/schemas/Transactions'
 *    responses:
 *     200:
 *      description: A new transaction has been created!
 */
router.post("/", post);
router.delete("/:id", deleteTransaction);

module.exports = router;
