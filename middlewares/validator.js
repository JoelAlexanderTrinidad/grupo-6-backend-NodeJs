const { unlink: unlinkFile } = require('fs');
const { validationResult, checkSchema } = require('express-validator');
const { ErrorObject } = require('../helpers/error');
const { catchAsync } = require('../helpers/catchAsync');


module.exports = schema => catchAsync(async (req, res, next) => {

    const schemaValidation = checkSchema(schema);
    await Promise.all(schemaValidation.map(validation => validation.run(req)));
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    if (req.file) await unlinkFile(req.file.path);

    return res
        .status(400)
        .json(new ErrorObject("Bad Request", 400, errors.array()))

});
