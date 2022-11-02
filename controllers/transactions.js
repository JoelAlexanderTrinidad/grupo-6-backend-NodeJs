const { catchAsync } = require("../helpers/catchAsync");
const createHttpError = require('http-errors');
const { Transactions } = require('../database/models');
const { endpointResponse } = require("../helpers/success");


module.exports = {
    get: catchAsync(async(req, res, next) => {
        try {
            const response = await Transactions.findAll()
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
    })
}