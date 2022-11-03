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
      emailDoesExist && res.status(403).json('Email is already in use');

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
  }),

  put: catchAsync(async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, avatar, roleId } = req.body;
      const userId = req.params.id;
      const searchedUser = await User.findOne({where: {id: userId}});

      if (!searchedUser) { return res.status(404).json({message: `User with id ${userId} was not found`});}

      const hashedPassword = createHash(password);

      const newValuesUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        avatar,
        roleId
      };

      const modifiedUser = await User.update(newValuesUser, {where: {id: userId}});
      if (modifiedUser) {
        return res.status(201).json({modified: newValuesUser});
      }

    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error modifying user] - [index - PUT]: ${error.message}`,
      )
      next(httpError)
    }   
  }),

  deleteUser: catchAsync(async (req, res, next) => {
    try {
      const userId = req.params.id;
      const searchedUser = await User.findOne({where: {id: userId}});

      if (!searchedUser) { return res.status(404).json({message: `User with id ${userId} was not found`});}

      const deletedUser = await User.destroy({where: {id: userId}});

      if (deletedUser) {
        return res.status(201).json({message: 'User deleted'});
      }

    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting user] - [index - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  })
}
