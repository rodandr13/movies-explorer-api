require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { ALLOWED_CORS } = require('./utils/constans');

const corsOptions = {
  origin(origin, callback) {
    if (ALLOWED_CORS.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Ошибка CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

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
app.use(cors(corsOptions));
app.use(requestLogger);
app.use(cookieParser());

app.use(routes);

app.use(errorLogger);

app.listen(PORT);
