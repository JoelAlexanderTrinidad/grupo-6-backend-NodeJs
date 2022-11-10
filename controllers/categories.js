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
    }),
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
}
// example of a controller. First call the service, then build the controller method

