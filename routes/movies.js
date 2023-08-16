const router = require('express').Router();

const {
  getFavoriteMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getFavoriteMovies);
router.post('/', createMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;