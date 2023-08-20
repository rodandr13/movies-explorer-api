const { FORBIDDEN_CODE } = require('../utils/constans');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = FORBIDDEN_CODE;
  }
}

module.exports = {
  ForbiddenError,
};
