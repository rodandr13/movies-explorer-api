const router = require('routes').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:movieId', deleteMovie)

module.exports = router;