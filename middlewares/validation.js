const { celebrate, Joi } = require('celebrate');
const { VALID_URL_EXPRESSION } = require('../utils/constans');

const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(120),
    director: Joi.string().required().min(2).max(120),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(30),
    description: Joi.string().required(),
    image: Joi.string().required().regex(VALID_URL_EXPRESSION),
    trailerLink: Joi.string().required().regex(VALID_URL_EXPRESSION),
    nameRU: Joi.string().required().min(2).max(120),
    nameEN: Joi.string().required().min(2).max(120),
    thumbnail: Joi.string().required().regex(VALID_URL_EXPRESSION),
    movieId: Joi.number().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  signupValidation,
  signinValidation,
  updateProfileValidation,
  createMovieValidation,
  movieIdValidation,
};
