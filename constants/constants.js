module.exports.urlReg = /^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/;
module.exports.urlRegG = /^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/g;

module.exports.PORT = 3000;
module.exports.DB_DEV_ADDRESS = 'mongodb://127.0.0.1/moviesdb';

module.exports.ALLOWED_DOMAINS = [
  'https://api.vilnid.nomoredomains.sbs',
  'http://api.vilnid.nomoredomains.sbs',
  'https://vilnid.nomoredomains.sbs',
  'http://vilnid.nomoredomains.sbs',
  'http://localhost:3000',
];

module.exports.USER_SCHEMA = {
  NAME: 'Введите имя',
  NAME_MIN: 'Имя должно быть не короче 2 символов',
  NAME_MAX: 'Имя должно быть короче 30 символов',
  EMAIL: 'Введите email',
  EMAIL_VALIDATE: 'Введен некорректный email',
  PASSWORD: 'Введите пароль',
};

module.exports.MOVIE_SCHEMA = {
  COUNTRY: 'Введите название страны',
  DIRECTOR: 'Введите имя режиссера',
  DURATION: 'Введите длительность фильма',
  YEAR: 'Введите год выпуска фильма',
  DESCRIPTION: 'Введите описание фильма',
  IMAGE: 'Введите ссылку на постер к фильму',
  TRAILERLINK: 'Введите ссылку на трейлер к фильму',
  THUMBNAIL: 'Введите ссылку на миниатюрное изображение постера к фильму',
  OWNER: 'Введите id пользователя',
  MOVIEID: 'Введите id фильма',
  NAMERU: 'Введите название фильма на русском языке',
  NAMEEN: 'Введите название фильма на английском языке',
  VALIDATE: 'Введен некорректный формат ссылки',
};

module.exports.ERROR_MESSAGE = {
  AUTH_ERR_MSG: 'Неверный e-mail или пароль',
  NEED_AUTH_MSG: 'Необходима авторизация!',
  BAD_REQST_MSG: 'Переданы некорректные данные',
  DUP_EMAIL_MSG: 'Указанный email уже зарегестрирован',
  NOT_FOUND: 'Запрашиваемая страница или URL не найдены',
  NOT_FOUND_USER_MSG: 'Запрашиваемый пользователь по указанному id не найден',
  NOT_FOUND_MOVIE_MSG: 'Запрашиваемый фильм по указанному id не найден',
  FORBIDDEN_ERR_MSG: 'У Вас недостаточно прав для удаления фильма',
  SERVER_ERR_MSG: 'Ошибка Сервера',
};

module.exports.ERROR_TYPE = {
  VALIDATION: 'ValidationError',
  CAST: 'CastError',
  BAD_REQST: 'BadRequestError',
  DUPLICATE: 'DuplicateDataError',
  FORBIDDEN: 'ForbiddenError',
  NOT_FOUND: 'NotFoundError',
  UNAUTH: 'UnauthorizedError',
};

module.exports.STSTUS_CODE = {
  CREATE_CODE: 201,
  DUP_CODE: 11000,
  BAD_REQST_CODE: 400,
  DUP_DATA_CODE: 409,
  FORBIDDEN_CODE: 403,
  NOT_FOUND_CODE: 404,
  UNAUTH_CODE: 401,
  SERVER_ERR_CODE: 500,
};
