const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const DuplicateDataError = require('../errors/DuplicateDataError');
const NotFoundError = require('../errors/NotFoundError');
const { ERROR_MESSAGE, ERROR_TYPE, STSTUS_CODE } = require('../constants/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;
  // хешируем пароль
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(STSTUS_CODE.CREATE_CODE).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === ERROR_TYPE.VALIDATION) {
        next(new BadRequestError(ERROR_MESSAGE.BAD_REQST_MSG));
        return;
      } if (err.code === STSTUS_CODE.DUP_CODE) {
        next(new DuplicateDataError(ERROR_MESSAGE.DUP_EMAIL_MSG));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ user }))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(ERROR_MESSAGE.NOT_FOUND_USER_MSG));
        return;
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.CAST) {
        next(new BadRequestError(ERROR_MESSAGE.BAD_REQST_MSG));
        return;
      } if (err.code === STSTUS_CODE.DUP_CODE) {
        next(new DuplicateDataError(ERROR_MESSAGE.DUP_EMAIL_MSG));
        return;
      }
      next(err);
    });
};
