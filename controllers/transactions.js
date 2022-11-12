
const createHttpError = require('http-errors')
const { Transactions } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

const { ErrorObject } = require("../helpers/error");

module.exports =  {
    get: catchAsync(async (req, res, next) => {
    const userId = req.query;
    try {
      if (Object.entries(userId).length === 0) {
        const response = await Transactions.findAll();
        endpointResponse({
          res,
          message: "Transactions retrieved successfully",
          body: response,
        });
      } else {
        const response = await Transactions.findOne({
          where: {
            userId: userId.query,
          },
        });
        if (isNaN(req.query.query)) {
          let error = new ErrorObject("User transaction no found", 400, [
            "Invalid format, you must enter a number",
          ]);
          return res.status(400).json(error);
        } else if (!response) {
          let error = new ErrorObject("User transaction no found", 404, [
            "The user transaction number does not exist",
          ]);
          return res.status(404).json(error);
        }

        endpointResponse({
          res,
          message: "Transactions retrieved successfully",
          body: response,
        });
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving transactions]- [index- GET]:${error.message}`
      );
      next(httpError);
    }
  }),
  getTransaction: catchAsync(async (req, res, next) => {
    try {
      const response = await Transactions.findByPk(req.params.id);

      if (isNaN(req.params.id)) {
        let error = new ErrorObject("Transaction no found", 400, [
          "Invalid format, you must enter a number",
        ]);
        return res.status(400).json(error);
      } else if (!response) {
        let error = new ErrorObject("Transaction no found", 400, [
          "The transaction number does not exist",
        ]);
        return res.status(400).json(error);
      }

      endpointResponse({
        res,
        message: "Transactions retrieved successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving transactions]- [index- GET]:${error.message}`
      );
      next(httpError);
    }
  }),
 post: catchAsync(async (req, res, next) => {
    try {
      if (req.body.userId && req.body.categoryId && req.body.amount && req.body.description && req.body.date) {
        const newTransaction = new Transactions({
          description: req.body.description,
          userId: req.body.userId,
          categoryId: req.body.categoryId,
          amount: req.body.amount,
          date: req.body.date,
          date:req.body.date
        });
        const savedTransaction = await newTransaction.save();
        endpointResponse({
          res,
          message: "Transactions retrieved successfully",
          body: savedTransaction,
        });
      } else {
        {
          throw new ErrorObject("fields could not be validated", 400);
        }
      }} catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving transactions]- [index- POST]:${error.message}`
      );
      next(httpError);
    }
  }),
  deleteTransaction: catchAsync(async (req, res, next) => {
   
    try {
    const transactionId = req.params.id;
    const searchedTransaction = await Transactions.findOne({
      where: { id: transactionId },
    });

    if (!searchedTransaction) {
      throw new ErrorObject(`Transaction with id ${transactionId} was not found`, 404);
    }

    const deletedTransaction = await Transactions.destroy({ where: { id: transactionId } });

    if (deletedTransaction) {
      endpointResponse({
        res,
        code: 201,
        message: "Transactiondeleted successfully",
      });
    }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving transactions]- [index- DELETE]:${error.message}`
      );
      next(httpError);
    }
  }),

};