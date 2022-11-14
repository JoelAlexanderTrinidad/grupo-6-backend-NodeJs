const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { decodeToken } = require('../middlewares/jwt.js');

//models
const { User } = require('../database/models');

//helpers
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const { ErrorObject } = require('../helpers/error');

dotenv.config({ path: './.env' });

module.exports = {
  protectToken: catchAsync(async (req, res, next) => {
    try {
      let token;
      // Extract token from headers
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        // ['Bearer', 'token']
        token = req.headers.authorization.split(' ')[1];
      }
      if (!token) {
        throw new ErrorObject('Credentials invalid', 403);
      }

      // Validate token
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      // decoded returns
      const user = await User.findOne({
        where: { id: decoded.data.id },
      });

      if (!user) {
        throw new ErrorObject('Credentials invalid', 403);
      }

      res.locals.user = user;

      next();
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Unauthorized] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};