const { catchAsync } = require("../helpers/catchAsync");
const createHttpError = require("http-errors");
const { Transaction } = require("../database/models");
const { endpointResponse } = require("../helpers/success");
const { ErrorObject } = require("../helpers/error");

module.exports = {
  get: catchAsync(async (req, res, next) => {
    const userId = req.query;
    try {
      if (Object.entries(userId).length === 0) {
        const response = await Transaction.findAll();
        endpointResponse({
          res,
          message: "Transactions retrieved successfully",
          body: response,
        });
      } else {
        const response = await Transaction.findOne({
          where: {
            userId: userId.query,
          },
        });
        if (isNaN(req.query.query)) {
          let error = new ErrorObject("User transaction no found", 404, [
            "You must enter a number",
          ]);
          return res.status(400).json(error);
        } else if (!response) {
          let error = new ErrorObject("User transaction no found", 404, [
            "The user transaction number does not exist",
          ]);
          return res.status(400).json(error);
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
      const response = await Transaction.findByPk(req.params.id);

      if (isNaN(req.params.id)) {
        let error = new ErrorObject("Transaction no found", 404, [
          "You must enter a number",
        ]);
        return res.status(400).json(error);
      } else if (!response) {
        let error = new ErrorObject("Transaction no found", 404, [
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
      if (req.body.userId && req.body.categoryId && req.body.amount) {
        const newTransaction = new Transaction({
          userId: req.body.userId,
          categoryId: req.body.categoryId,
          amount: req.body.amount,
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
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving transactions]- [index- POST]:${error.message}`
      );
      next(httpError);
    }
  }),
  
};
