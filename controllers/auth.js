const createHttpError = require('http-errors')
const { User } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { isValidPassword } = require('../helpers/bcrypt.js')
const { ErrorObject } = require('../helpers/error')

module.exports = {
    login: catchAsync(async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const userExists = await User.findOne({raw: true, where: {email}});
            if (!userExists) { throw new ErrorObject('User does not exist', 404) }

            const hashedPassword = userExists.password;
            const passwordMatches = userExists && isValidPassword(hashedPassword, password) ? true : null;

            if (passwordMatches) {
                endpointResponse({
                    res,
                    code: 200,
                    message: 'Successful login',
                    body: userExists,
                  })
            } else {
                throw new ErrorObject('{ok: false}', 403) 
            }

        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Login error] - [users - POST]: ${error.message}`,
              )
              next(httpError)
        }
    })
}