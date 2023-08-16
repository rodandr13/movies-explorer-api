const Movie = require('../models/movie');
const { ValidationError } = require('../errors/ValidationError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { NotFoundError } = require('../errors/NotFoundError');

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
        next(new ValidationError('Переданы некорректные данные.'));
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
        throw new NotFoundError('Фильм с указанным _id не найден.');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав.');
      }
      return Movie.deleteOne(movie);
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationError('Недопустимый _id фильма.'));
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
