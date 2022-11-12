const createHttpError = require('http-errors')
const { User } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { createHash } = require('../helpers/bcrypt.js')
const { ErrorObject } = require('../helpers/error')


module.exports = {
  //GET all users
  users: catchAsync(async (req, res, next) => {
    try {
      const limit = 10
      let page = 1
      let offset = 0
      let linkPrevious = null
      let linkNext = null
      const baseUrl = "http://localhost:3000/users?page=";

      if(req.query.hasOwnProperty('page')){
        if (isNaN(req.query.page)) {
          throw new ErrorObject("Invalid format, you must enter a number", 404);
        }}

      if (req.query.page >1) {
        page = parseInt(req.query.page)
        offset = (page-1)*limit
        }

      const query = await User.findAndCountAll(
        {attributes:['id','firstName','lastName','email','createdAt'],
        limit: limit,
        offset: offset
      });
      const itemsCount = query.count - (page*limit)
      console.log(query.count)
      if(itemsCount > 0){ 
      linkNext = baseUrl + (page + 1)
      }
      if(page > 1){ 
        linkPrevious = baseUrl + (page - 1)
        }
      const users = {...query,linkPrevious,linkNext}
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

  post: catchAsync(async (req, res, next) => {

    const emailDoesExist = await User.findOne({where: {email: req.body.email}});
    const thereIsAvatar = req.body.avatar || null;
    const thereIsRole = req.body.roleId || null;

    try {
      if (emailDoesExist) { throw new ErrorObject('Email is already in use', 403) }

        const hashedPassword = createHash(req.body.password);
        const newUser = {
          firstName: req.body.firstName, 
          lastName: req.body.lastName, 
          email: req.body.email, 
          password: hashedPassword,
          avatar: thereIsAvatar,
          roleId: thereIsRole
        }

        const createdUser = await User.create(newUser);
        endpointResponse({
          res,
          code: 201,
          message: 'User created successfully',
          body: createdUser,
        })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating user] - [users - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  put: catchAsync(async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, avatar, roleId } = req.body;
      const userId = req.params.id;
      const searchedUser = await User.findOne({where: {id: userId}});
      const emailDoesExist = await User.findOne({where: {email: email}});

      if (!searchedUser) { throw new ErrorObject(`User with id ${userId} was not found`, 404) }
      if (emailDoesExist) { throw new ErrorObject('Email is already in use', 403) }

      const hashedPassword = createHash(password);

      const newValuesUser = {
        firstName: firstName || null,
        lastName: lastName ||  null,
        email: email || null,
        password: hashedPassword || null,
        avatar: avatar || null,
        roleId: roleId || null
      };

      const modifiedUser = await User.update(newValuesUser, {where: {id: userId}});
      if (modifiedUser) {
        endpointResponse({
          res,
          code: 201,
          message: 'User modified successfully',
          body: newValuesUser,
        })
      }

    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error modifying user] - [users - PUT]: ${error.message}`,
      )
      next(httpError)
    }   
  }),

  deleteUser: catchAsync(async (req, res, next) => {
    try {
      const userId = req.params.id;
      const searchedUser = await User.findOne({where: {id: userId}});

      if (!searchedUser) { throw new ErrorObject(`User with id ${userId} was not found`, 404) }

      const deletedUser = await User.destroy({where: {id: userId}});

      if (deletedUser) {
        endpointResponse({
          res,
          code: 201,
          message: 'User deleted successfully',
        })
      }

    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting user] - [users - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  })
}




