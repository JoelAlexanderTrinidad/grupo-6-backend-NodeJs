const createHttpError = require('http-errors')
const { Category } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

// example of a controller. First call the service, then build the controller method
module.exports = {
  getCategories: catchAsync(async (req, res, next) => {
    try {
      const response = await Category.findAll() 
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
  deleteCategory: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      //search a category by Id code
      const category = await Category.findOne({ where: { id } });
      0;
      //Verify if exist a category with Id given and answer with an error msm
      if (!category) {
        return res.status(404).json({
          status: "error",
          message: "Category not found with Id given",
        });
      }
      //If category exist, this is deleted
      await category.destroy(category);

      endpointResponse({
        res,
        message: "Categoriy have been deleted successfully",
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving categories] - [index - DELETE]: ${error.message}`
      );
      next(httpError);
    }
  }),
}

