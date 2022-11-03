const createHttpError = require("http-errors");
const { User } = require("../database/models");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { response } = require("express");

// example of a controller. First call the service, then build the controller method
// module.exports = {
//   get: catchAsync(async (req, res, next) => {
//     try {
//       const response = await Test.findAll();
//       endpointResponse({
//         res,
//         message: "Test retrieved successfully",
//         body: response,
//       });
//     } catch (error) {
//       const httpError = createHttpError(
//         error.statusCode,
//         `[Error retrieving index] - [index - GET]: ${error.message}`
//       );
//       next(httpError);
//     }
//   }),
// };

//GET all users
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const users = await User.findAll();
      endpointResponse({
        users,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};

//GET user by Id
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        endpointResponse({
          res,
          message: "User not found with id given",
          body: response,
          user,
        });
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
