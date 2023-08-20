const { BAD_REQUEST_CODE } = require('../utils/constans');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = BAD_REQUEST_CODE;
  }
}

module.exports = {
  ValidationError,
};
