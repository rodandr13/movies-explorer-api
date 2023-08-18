const allowedCors = [
  'https://api.backend.nomoreparties.co',
  'http://api.backend.nomoreparties.co',
  'localhost:3001',
  'http://localhost:3001',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
