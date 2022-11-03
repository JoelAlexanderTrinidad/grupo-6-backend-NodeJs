const createHttpError = require('http-errors')
const { User } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { createHash, isValidPassword } = require('../helpers/bcrypt.js')

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await User.findAll()
      endpointResponse({
        res,
        message: 'Users retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),


  post: catchAsync(async (req, res, next) => {

    const formatIsOk = req.body.firstName && req.body.lastName && req.body.email && req.body.password ? true : null;
    const emailDoesExist = await User.findOne({where: {email: req.body.email}});
    const thereIsAvatar = req.body.avatar || null;
    const thereIsRole = req.body.roleId || null;

    try {
      if (emailDoesExist) {
        return res.status(403).json('Email is already in use');
      }

      if (formatIsOk) {
        const hashedPassword = createHash(req.body.password);
        const newUser = {
          firstName: req.body.firstName, 
          lastName: req.body.lastName, 
          email: req.body.email, 
          password: hashedPassword,
          avatar: thereIsAvatar,
          roleId: thereIsRole
        }

        await User.create(newUser);
        return res.status(201).json(newUser);
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating user] - [index - POST]: ${error.message}`,
      )
      next(httpError)
    }
  })
}
