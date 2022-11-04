const createHttpError = require("http-errors");
const { User } = require("../database/models");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");

//GET all users
module.exports = {
  users: catchAsync(async (req, res, next) => {
    try {
      const users = await User.findAll();
      endpointResponse({
        res,
        message: "Users retrieved successfully",
        body: users,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),

  //GET user by Id
  userById: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found, pleace register",
        });
      } else
        endpointResponse({
          res,
          message: "User retrieved successfully",
          body: user,
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
