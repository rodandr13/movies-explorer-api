require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const { limiter } = require('./middlewares/limiter');
const { DEV_DB, DEV_PORT } = require('./utils/constans');

const app = express();
const { PORT = DEV_PORT, MONGODB_URI = DEV_DB } = process.env;
mongoose.connect(MONGODB_URI);

app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: [
      'https://frontend.nomoredomainsrocks.ru',
      'http://frontend.nomoredomainsrocks.ru',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ],
    credentials: true,
  }),
);

app.use(requestLogger);
app.use(cookieParser());

app.use(routes);

app.use(errorLogger);


app.listen(PORT);
