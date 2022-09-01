const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { USER_SCHEMA, ERROR_MESSAGE } = require('../constants/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, USER_SCHEMA.NAME],
    minlength: [2, USER_SCHEMA.NAME_MIN],
    maxlength: [30, USER_SCHEMA.NAME_MAX],
  },
  email: {
    type: String,
    required: [true, USER_SCHEMA.EMAIL],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: USER_SCHEMA.EMAIL_VALIDATE,
    },
    unique: true, // e-mail должен быть уникальным
  },
  password: {
    type: String,
    required: [true, USER_SCHEMA.PASSWORD],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function find(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(ERROR_MESSAGE.AUTH_ERR_MSG);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(ERROR_MESSAGE.AUTH_ERR_MSG);
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
