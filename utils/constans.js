const ALLOWED_CORS = [
  'https://api.backend.nomoreparties.co',
  'http://api.backend.nomoreparties.co',
  'localhost:3001',
  'http://localhost:3001',
  'localhost:3000',
  'http://localhost:3000',
  '*',
  'http://127.0.0.1:3000',
  '127.0.0.1:3000',
  'http://frontend.nomoredomainsrocks.ru',
  'https://frontend.nomoredomainsrocks.ru',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const DEV_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const DEV_PORT = 3001;

const INVALID_DATA_ERROR_MSG = 'Переданы некорректные данные.';
const DUPLICATE_EMAIL_ERROR_MSG = 'Такой email уже существует';
const USER_NOT_FOUND_MSG = 'Пользователь по указанному _id не найден.';
const LOGOUT_SUCCESS_MSG = 'Вы успешно вышли.';
const INVALID_USER_ID_MSG = 'Недопустимый _id пользователя.';
const USER_ALREADY_EXISTS_MSG = 'Такой пользователь уже существует';
const MOVIE_NOT_FOUND_MSG = 'Фильм с указанным _id не найден.';
const DELETE_PERMISSION_DENIED_MSG = 'Нет прав на удаление фильма.';
const INVALID_MOVIE_ID_MSG = 'Недопустимый _id фильма.';
const AUTHORIZATION_REQUIRED_MSG = 'Необходима авторизация';
const SERVER_ERROR_MSG = 'На сервере произошла ошибка';
const INVALID_URL_MSG = 'Некорректный URL.';
const INVALID_EMAIL_MSG = 'Некорректный email.';
const INVALID_EMAIL_OR_PASSWORD_MSG = 'Неправильные почта или пароль';
const PAGE_NOT_FOUND_MSG = 'Страница не найдена.';

const INTERNAL_SERVER_ERROR_CODE = 500;
const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const NOT_FOUND_CODE = 404;
const FORBIDDEN_CODE = 403;
const CONFLICT_CODE = 409;

const MONGO_DUPLICATE_KEY_ERROR = 11000;

const VALID_URL_EXPRESSION = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/i;

module.exports = {
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
  DEV_DB,
  DEV_PORT,
  INVALID_DATA_ERROR_MSG,
  DUPLICATE_EMAIL_ERROR_MSG,
  USER_NOT_FOUND_MSG,
  LOGOUT_SUCCESS_MSG,
  INVALID_USER_ID_MSG,
  USER_ALREADY_EXISTS_MSG,
  MOVIE_NOT_FOUND_MSG,
  DELETE_PERMISSION_DENIED_MSG,
  INVALID_MOVIE_ID_MSG,
  AUTHORIZATION_REQUIRED_MSG,
  SERVER_ERROR_MSG,
  INVALID_URL_MSG,
  INVALID_EMAIL_MSG,
  INVALID_EMAIL_OR_PASSWORD_MSG,
  PAGE_NOT_FOUND_MSG,
  INTERNAL_SERVER_ERROR_CODE,
  BAD_REQUEST_CODE,
  UNAUTHORIZED_CODE,
  NOT_FOUND_CODE,
  FORBIDDEN_CODE,
  CONFLICT_CODE,
  MONGO_DUPLICATE_KEY_ERROR,
  VALID_URL_EXPRESSION,
};
