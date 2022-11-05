const { catchAsync } = require("../helpers/catchAsync");
const createHttpError = require("http-errors");
const { Transaction } = require("../database/models");
const { endpointResponse } = require("../helpers/success");
const {ErrorObject}= require("../helpers/error")

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await Transaction.findAll();
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
      if (
        req.body.userId &&
        req.body.categoryId &&
        req.body.amount 
      ) {
        const newTransaction = new Transaction({
         userId: req.body.userId,
         categoryId: req.body.categoryId,
         amount: req.body.amount
        });
      const savedTransaction = await newTransaction.save();
      endpointResponse({
        res,
        message: "Transactions retrieved successfully",
        body: savedTransaction,
      });
      }else{
     {throw new ErrorObject("fields could not be validated", 400);}
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
