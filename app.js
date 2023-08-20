require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');
const routes = require('./routes');
const { limiter } = require('./middlewares/limiter');
const { DEV_DB, DEV_PORT } = require('./utils/constans');

const app = express();
const { PORT = DEV_PORT, MONGODB_URI = DEV_DB } = process.env;
mongoose.connect(MONGODB_URI);

app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cors);
app.use(requestLogger);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
