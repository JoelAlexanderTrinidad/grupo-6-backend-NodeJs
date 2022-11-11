const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//models
const { User } = require('../database/models');

//helpers
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const { isValidPassword } = require('../helpers/bcrypt.js');
const { ErrorObject } = require('../helpers/error');

dotenv.config({ path: './.env' });

module.exports = {
  login: catchAsync(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const emailAndPassExists = email && password ? true : null;
      if (!emailAndPassExists) {
        throw new ErrorObject('Missing email or password fields', 400);
      }

      const userExists = await User.findOne({ raw: true, where: { email } });
      if (!userExists) {
        throw new ErrorObject('User does not exist', 404);
      }

      const hashedPassword = userExists.password;
      const passwordMatches =
        userExists && isValidPassword(hashedPassword, password) ? true : null;

      //Generate JWT
      const token = await jwt.sign(
        { id: userExists.id },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );

      //For security, it hides the user's password.
      userExists.password = undefined;

      if (passwordMatches) {
        endpointResponse({
          res,
          code: 200,
          message: 'Successful login',
          //JWT of implementation
          body: userExists,
          token: token,
        });
      } else {
        throw new ErrorObject('{ok: false}', 403);
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Login error] - [users - POST]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
