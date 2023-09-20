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
const corsOptions = require('./utils/corsOptions');

const app = express();
const { PORT = DEV_PORT, MONGODB_URI = DEV_DB } = process.env;
mongoose.connect(MONGODB_URI);

app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cors(corsOptions));
app.use(requestLogger);
app.use(cookieParser());

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
