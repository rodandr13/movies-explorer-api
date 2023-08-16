const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { createUser, login } = require('./controllers/users');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { auth } = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const {NotFoundError} = require("./errors/NotFoundError");

const app = express();
const { PORT = 3000, MONGODB_URI = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

mongoose.connect(MONGODB_URI);
app.use(bodyParser.json());
app.use('/signin', login);
app.use('/signup', createUser);
app.use('/users', auth, usersRouter);
app.use('/movies', auth, moviesRouter);
app.use(auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});
app.use(errors());
app.use(errorHandler);
app.listen(PORT);