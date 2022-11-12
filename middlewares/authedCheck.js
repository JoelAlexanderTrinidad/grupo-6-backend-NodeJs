const { catchAsync } = require('../helpers/catchAsync');
const { ErrorObject } = require('../helpers/error');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;


module.exports = () => catchAsync(async (req, res, next) => {

    try {

        const { "x-access-token": token } = req.headers;

        jwt.verify(token, SECRET_KEY)

        return next();

    } catch (error) {

        const errorObject = new ErrorObject("Token Error", 403, error)
        return res.json(errorObject);

    }
})