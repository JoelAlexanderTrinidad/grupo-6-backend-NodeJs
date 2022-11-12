const createHttpError = require('http-errors')
const { Transaction } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { ErrorObject } = require("../helpers/error");

module.exports =  {
    get: catchAsync(async (req, res, next) => {
    
    try {
      let page = 1
      let offset = 0
      let linkPrevious = null
      let linkNext = null
      const limit = 10
      const baseUrl = "http://localhost:3000/transactions?page=";
      
      console.log(req.query)
      
        if (parseInt(req.query.page) > 1) {
          page = parseInt(req.query.page)
          offset = page*limit
        } 
        let queryResult = []
        
    if(!req.query.hasOwnProperty('query')){
      queryResult = await Transaction.findAndCountAll(
      {
          limit:limit,
          offset:offset
      })
     
        const totalPages = (queryResult.count)/limit
        
        if(totalPages-page >= 0){ 
          linkNext = baseUrl + (page + 1)
          }
        if(page > 1){ 
            linkPrevious = baseUrl + (page - 1)
            }}

   if(req.query.hasOwnProperty('query')){
    if (isNaN(req.query.query)) {
      throw new ErrorObject("Invalid format, you must enter a number", 404);
    }
    
   const userId = req.query.query
     queryResult = await Transaction.findAndCountAll(
        {
          where: {
            userId: userId,
              },
           limit:limit,
          offset:offset
         })

       if (queryResult.count === 0) {
      throw new ErrorObject("The user does not exist", 404);
      }
        const totalPages = (queryResult.count)/limit
       
        if(totalPages-page >= 0){ 
          linkNext = baseUrl + (page + 1)+ "&query="+userId
          }
        if(page > 1){ 
            linkPrevious = baseUrl + (page - 1) + "&query="+userId
        }}
    const transactions = {...queryResult,linkPrevious,linkNext}
        
    endpointResponse({
      res,
      message: "Transactions retrieved successfully",
        body: transactions,
    });
      
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
  deleteTransaction: catchAsync(async (req, res, next) => {
   
    try {
    const transactionId = req.params.id;
    const searchedTransaction = await Transaction.findOne({
      where: { id: transactionId },
    });

    if (!searchedTransaction) {
      throw new ErrorObject(`Transaction with id ${transactionId} was not found`, 404);
    }

    const deletedTransaction = await Transaction.destroy({ where: { id: transactionId } });

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


