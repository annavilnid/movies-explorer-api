const User = require('../models/user');

const {
  ERROR_CODE, NOT_FOUND_CODE, SERVER_ERROR_CODE, CREATED_CODE,
} = require('../errrors/errors');

module.exports.createUser = (req, res) => {
  console.log('create user');
  const { name, email, password } = req.body;
  User.create({ name, email, password })
    .then((user) => res.status(CREATED_CODE).send({ user }))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: err.message });
      }
      res.status(SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
    });
};

module.exports.getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_CODE).send({ message: 'Запрашиваемый пользователь по указанному id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: err.message });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, email } = req.body;
  User.findOneAndUpdate({ id: req.user._id }, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send({ user });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: err.message });
      }
      res.status(SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
    });
};
