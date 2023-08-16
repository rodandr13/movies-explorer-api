const router = require('express').Router();

const { signinValidation, signupValidation } = require('../middlewares/validation');
const { login, createUser, logout } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { NotFoundError } = require('../errors/NotFoundError');

router.post('/signin', signinValidation, login);
router.post('/signup', signupValidation, createUser);
router.get('/signout', signupValidation, logout);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use(auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});

module.exports = router;
