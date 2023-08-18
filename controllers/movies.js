const Movie = require('../models/movie');
const { ValidationError } = require('../errors/ValidationError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { NotFoundError } = require('../errors/NotFoundError');
const {
  INVALID_DATA_ERROR_MSG, MOVIE_NOT_FOUND_MSG, DELETE_PERMISSION_DENIED_MSG, INVALID_MOVIE_ID_MSG,
} = require('../utils/constans');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ValidationError(INVALID_DATA_ERROR_MSG));
      } else {
        next(error);
      }
    });
};

const getFavoriteMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({ owner: userId })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND_MSG);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(DELETE_PERMISSION_DENIED_MSG);
      }
      return Movie.deleteOne(movie);
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationError(INVALID_MOVIE_ID_MSG));
      } else {
        next(error);
      }
    });
};

module.exports = {
  createMovie,
  getFavoriteMovies,
  deleteMovie,
};
