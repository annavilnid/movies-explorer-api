const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcrypt');
// const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Введите имя'],
    minlength: [2, 'Текст должен быть не короче 2 символов'],
    maxlength: [30, 'Текст должен быть короче 30 символов'],
  },
  email: {
    type: String,
    required: [true, 'Введите email'],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Введен некорректный email',
    },
    unique: true, // e-mail должен быть уникальным
  },
  password: {
    type: String,
    required: [true, 'Введите пароль'],
    select: false,
  },
});

// userSchema.statics.findUserByCredentials = function find(email, password) {
//   return this.findOne({ email }).select('+password')
//     .then((user) => {
//       if (!user) {
//         throw new UnauthorizedError('Неправильные почта или пароль');
//       }

//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             throw new UnauthorizedError('Неправильные почта или пароль');
//           }

//           return user; // теперь user доступен
//         });
//     });
// };

module.exports = mongoose.model('user', userSchema);
