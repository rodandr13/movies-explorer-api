const router = require('express').Router();

const { signinValidation, signupValidation } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { NotFoundError } = require('../errors/NotFoundError');

router.use('/signin', signinValidation, login);
router.use('/signup', signupValidation, createUser);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use(auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});

module.exports = router;
