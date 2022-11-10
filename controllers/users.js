const createHttpError = require('http-errors');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

//models
const { User } = require('../database/models');

//helpers
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const { createHash } = require('../helpers/bcrypt.js');
const { ErrorObject } = require('../helpers/error');
const { storage } = require('../helpers/firebase');

//CRUD´s
module.exports = {
  //GET all users
  users: catchAsync(async (req, res, next) => {
    try {
      const users = await User.findAll();

      const usersPromises = users.map(async user => {
        // Create firebase img ref and get the full path
        const imgRef = ref(storage, user.avatar);
        const url = await getDownloadURL(imgRef);

        // Update the user's profileImgUrl property
        user.avatar = url;
        return user;
      });
      const usersResolved = await Promise.all(usersPromises);

      endpointResponse({
        res,
        message: 'Users retrieved successfully',
        body: users,
        body: usersResolved,
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
      //Get URL image from firebase
      const imgRef = ref(storage, user.avatar);
      const url = await getDownloadURL(imgRef);
      //Update user's image property
      user.avatar = url;
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found, pleace register',
        });
      } else
        endpointResponse({
          res,
          message: 'User retrieved successfully',
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
    try {
      const formatIsOk =
        req.body.firstName &&
        req.body.lastName &&
        req.body.email &&
        req.body.password
          ? true
          : null;
      const emailDoesExist = await User.findOne({
        where: { email: req.body.email },
      });
      const thereIsAvatar = req.body.avatar || null;
      const thereIsRole = req.body.roleId || null;

      //Create user with Firebase service image
      const imageRef = ref(storage, `users/${req.file.originalname}`);
      const imageUploaded = await uploadBytes(imageRef, req.file.buffer);

      if (emailDoesExist) {
        throw new ErrorObject('Email is already in use', 403);
      }

      if (formatIsOk) {
        const hashedPassword = createHash(req.body.password);
        const newUser = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPassword,
          avatar: thereIsAvatar,
          roleId: thereIsRole,
          avatar: imageUploaded.metadata.fullPath,
        };

        const createdUser = await User.create(newUser);
        endpointResponse({
          res,
          code: 201,
          message: 'User created successfully',
          body: createdUser,
        });
      } else {
        throw new ErrorObject('Missing fields', 400);
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating user] - [users - POST]: ${error.message}`
      );
      next(httpError);
    }
  }),

  put: catchAsync(async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, avatar, roleId } = req.body;
      const userId = req.params.id;
      const searchedUser = await User.findOne({ where: { id: userId } });
      const emailDoesExist = await User.findOne({ where: { email: email } });

      if (!searchedUser) {
        throw new ErrorObject(`User with id ${userId} was not found`, 404);
      }
      if (emailDoesExist) {
        throw new ErrorObject('Email is already in use', 403);
      }

      const hashedPassword = createHash(password);

      const newValuesUser = {
        firstName: firstName || null,
        lastName: lastName || null,
        email: email || null,
        password: hashedPassword || null,
        avatar: avatar || null,
        roleId: roleId || null,
      };

      const modifiedUser = await User.update(newValuesUser, {
        where: { id: userId },
      });
      if (modifiedUser) {
        endpointResponse({
          res,
          code: 201,
          message: 'User modified successfully',
          body: newValuesUser,
        });
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error modifying user] - [users - PUT]: ${error.message}`
      );
      next(httpError);
    }
  }),

  deleteUser: catchAsync(async (req, res, next) => {
    try {
      const userId = req.params.id;
      const searchedUser = await User.findOne({ where: { id: userId } });

      if (!searchedUser) {
        throw new ErrorObject(`User with id ${userId} was not found`, 404);
      }

      const deletedUser = await User.destroy({ where: { id: userId } });

      if (deletedUser) {
        endpointResponse({
          res,
          code: 201,
          message: 'User deleted successfully',
        });
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting user] - [users - DELETE]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
