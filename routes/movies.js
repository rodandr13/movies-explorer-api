const router = require('express').Router();

const {
  getFavoriteMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { createMovieValidation, movieIdValidation } = require('../middlewares/validation');

router.get('/', getFavoriteMovies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = router;
