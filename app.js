const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000, MONGODB_URI = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

mongoose.connect(MONGODB_URI);

app.listen(PORT);