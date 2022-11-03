const { catchAsync } = require("../helpers/catchAsync")
const createHttpError = require('http-errors')
const { Transaction } = require('../database/models')
const { endpointResponse } = require("../helpers/success")
const { ErrorObject } = require('../helpers/error')


module.exports = {
    get: catchAsync(async(req, res, next) => {
        try {
            const response = await Transaction.findAll()
            endpointResponse({
                res,
                message: 'Transactions retrieved successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
            `[Error retrieving transactions]- [index- GET]:${error.message}`, 
            )
            next(httpError)
        }
    }),
    getTransaction: catchAsync(async(req, res, next) => {
        try {
            const response = await Transaction.findByPk(req.params.id)

            if(isNaN(req.params.id)){
               /*  return res.json({
                    error : 404,
                    message : 'You must enter a number'
                }) */
                let error = new ErrorObject('Transaction no found', 404, ['You must enter a number'])
                return res.json(error)
            }else if(!response){
                let error = new ErrorObject('Transaction no found', 404, ['The transaction number does not exist'])
                return res.json(error)
            }

            endpointResponse({
                res,
                message: 'Transactions retrieved successfully',
                body: response
            })
            
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
            `[Error retrieving transactions]- [index- GET]:${error.message}`, 
            )
            next(httpError)
        }
    }),
}