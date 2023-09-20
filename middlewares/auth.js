const jwt = require('jsonwebtoken');

const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { AUTHORIZATION_REQUIRED_MSG } = require('../utils/constans');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError(AUTHORIZATION_REQUIRED_MSG));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (error) {
    next(new UnauthorizedError(AUTHORIZATION_REQUIRED_MSG));
    return;
  }

  req.user = payload;
  next();
};

module.exports = {
  auth,
};
