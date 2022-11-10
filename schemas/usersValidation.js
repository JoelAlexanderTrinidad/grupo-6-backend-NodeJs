
const postValidationSchema = {
    firstName: {
        in: ['body'],
        isString: true,
        errorMessage: 'firstName is a required field'
    },
    lastName: {
        in: ['body'],
        isString: true,
        errorMessage: 'lastName is a required field'
    },
    email: {
        in: ['body'],
        isEmail: true,
        errorMessage: 'email is a required field'
    },
    password: {
        in: ['body'],
        isString: true,
        errorMessage: 'password is a required field'
    },
}

const loginValidationSchema = {
    email: {
        in: ['body'],
        isEmail: true,
        errorMessage: 'email is a required field'
    },
    password: {
        in: ['body'],
        isString: true,
        errorMessage: 'password is a required field'
    },
}

module.exports = {
    postValidationSchema,
    loginValidationSchema
}

