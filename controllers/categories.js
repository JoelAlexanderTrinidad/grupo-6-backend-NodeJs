const createHttpError = require('http-errors')
const { Category } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
    postCategories: catchAsync(async(req, res, next) => {
        try {
            const data = req.body
            const response = await Category.create({
                name: data.name,
                description: data.description,
                deletedAt: data.deletedAt,
                createdAt: Date.now(),
                updatedAt: Date.now(),

            })
            endpointResponse({
                res,
                message: 'Categories retrieved succesfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving categories] - [index - POST]: ${error.message}`
            )
            next(httpError)
        }
    }),
    putCategories: catchAsync(async(req, res, next) => {
        try {
            const id = req.params.id
            const data = req.body
            const response = await Category.update({
                name: data.name,
                deletedAt: data.deletedAt,
                description: data.description,
                updatedAt: Date.now()
            },{
                where : {
                    id
                }
            })
            endpointResponse({
                res,
                message: 'Categories retrieved succesfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving categories] - [index - PUT]: ${error.message}`
            )
            next(httpError)
        }
    })
}