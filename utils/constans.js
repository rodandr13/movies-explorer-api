const allowedCors = [
  'https://theory-web.nomoredomains.sbs',
  'http://api.theory-web.nomoreparties.co',
  'localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
