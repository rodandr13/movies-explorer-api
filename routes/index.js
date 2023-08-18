const router = require('express').Router();

const { signinValidation, signupValidation } = require('../middlewares/validation');
const { login, createUser, logout } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { NotFoundError } = require('../errors/NotFoundError');
const { PAGE_NOT_FOUND_MSG } = require('../utils/constans');

router.post('/signin', signinValidation, login);
router.post('/signup', signupValidation, createUser);
router.get('/signout', signupValidation, logout);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use(auth, (req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND_MSG));
});

module.exports = router;
