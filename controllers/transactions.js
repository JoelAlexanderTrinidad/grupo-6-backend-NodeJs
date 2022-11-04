const createHttpError = require('http-errors')
const { Transactions } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')


module.exports =  {
    postTransactions: catchAsync(async(req, res, next) => {
        try {
            const data = req.body
            const response = await Transactions.create({
                description: data.description,
                amount: data.amount,
                userId: data.userId,
                categoryId: data.categoryId,
                date: data.date,
                createAt: Date.now(),
                updateAt: Date.now()
            })
            endpointResponse({
                res,
                message: 'Transactions retrieved succesfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statatusCode,
                `[Error retrieving transactions] - [index - POST]: ${error.message}`
            )
            next(httpError)
        }
    }),
    putTransactions: catchAsync(async(req, res, next) => {
        console.log(req.params.id, req.body)
        try {
            const id = req.params.id
            const data = req.body
            const response = Transactions.update({
                description: data.description,
                amount: data.amount,
                userId: data.userId,
                categoryId: data.categoryId,
                date: data.date,
                updateAt: Date.now()
            },{
                where: {
                    id
                }
            })
            endpointResponse({
                res,
                message: 'Transactions retrieved succesfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statatusCode,
                `[Error retrieving transactions] - [index - POST]: ${error.message}`
            )
            next(httpError)
        }
    })
}