const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { ERROR_MESSAGE } = require('../constants/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(ERROR_MESSAGE.NEED_AUTH_MSG));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY');
  } catch (err) {
    next(new UnauthorizedError(ERROR_MESSAGE.NEED_AUTH_MSG));
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next();
};

module.exports = { auth };
