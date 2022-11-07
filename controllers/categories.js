const createHttpError = require('http-errors')
const { Category } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { ErrorObject } = require('../helpers/error')
// example of a controller. First call the service, then build the controller method
module.exports = {
  getCategories: catchAsync(async (req, res, next) => {
    try {
      
      const response = await Category.findAll({attributes:['id','name','description']}) 
      endpointResponse({
        res,
        message: 'Categories retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving Categories] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  getCategoriesById: catchAsync(async (req, res, next) => {
    try {
      const filter =  req.params['id']
      const categoryResult = await  Category.findOne({
        where:[{id: filter}],
      })
      console.log(categoryResult)
      if (categoryResult === null){
        throw new ErrorObject('Category ID not exists', 404)
      }
      const response = categoryResult

      endpointResponse({
        res,
        message: 'Categories retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving Categories] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }), 
}