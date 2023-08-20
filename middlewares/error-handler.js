const { SERVER_ERROR_MSG, INTERNAL_SERVER_ERROR_CODE } = require('../utils/constans');

const errorHandler = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR_CODE, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR_CODE
        ? SERVER_ERROR_MSG
        : message,
    });

  next();
};

module.exports = errorHandler;
