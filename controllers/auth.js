const createHttpError = require('http-errors')
const { User } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { isValidPassword } = require('../helpers/bcrypt.js')

module.exports = {
    login: catchAsync(async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const emailAndPassExists = email && password ? true : null
            if (!emailAndPassExists) { return res.status(403).json({error: 'Missing email or password fields'}) }
            const userExists = await User.findOne({raw: true, where: {email}});
            if (!userExists) { return res.status(404).json({message: 'User does not exist'}) }

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
                return res.status(403).json({ok: false})
            }

        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Login error] - [index - POST]: ${error.message}`,
              )
              next(httpError)
        }
    })
}