const { checkSchema } = require('express-validator/check');

const validator = schema => checkSchema(schema);

module.exports = validator;