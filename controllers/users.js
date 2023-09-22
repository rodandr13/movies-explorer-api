const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { NotFoundError } = require('../errors/NotFoundError');
const { ValidationError } = require('../errors/ValidationError');
const { ConflictError } = require('../errors/ConflictError');
const {
  INVALID_DATA_ERROR_MSG,
  DUPLICATE_EMAIL_ERROR_MSG,
  USER_NOT_FOUND_MSG,
  LOGOUT_SUCCESS_MSG,
  INVALID_USER_ID_MSG,
  USER_ALREADY_EXISTS_MSG,
  MONGO_DUPLICATE_KEY_ERROR,
} = require('../utils/constans');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch((error) => {
      if (error.code === MONGO_DUPLICATE_KEY_ERROR) {
        next(new ConflictError(USER_ALREADY_EXISTS_MSG));
        return;
      }
      if (error.name === 'ValidationError') {
        next(new ValidationError(INVALID_DATA_ERROR_MSG));
        return;
      }
      next(error);
    });
};

const getUser = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MSG);
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationError(INVALID_USER_ID_MSG));
      } else {
        next(error);
      }
    });
};

const getCurrentUser = ((req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MSG);
      }
      res.send(user);
    })
    .catch(next);
});

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      }).send({ token });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  }).send({ message: LOGOUT_SUCCESS_MSG });
};

const checkAuth = (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    res.json({ loggedIn: true });
  } catch (error) {
    res.json({ loggedIn: false });
  }
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MSG);
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.code === MONGO_DUPLICATE_KEY_ERROR) {
        next(new ConflictError(DUPLICATE_EMAIL_ERROR_MSG));
        return;
      }
      if (error.name === 'CastError') {
        next(new ValidationError(INVALID_DATA_ERROR_MSG));
        return;
      }
      next(error);
    });
};

module.exports = {
  createUser,
  getUser,
  getCurrentUser,
  updateUser,
  login,
  logout,
  checkAuth,
};
