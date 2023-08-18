const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const { INVALID_EMAIL_MSG, INVALID_EMAIL_OR_PASSWORD_MSG } = require('../utils/constans');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: INVALID_EMAIL_MSG,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD_MSG));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD_MSG));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
