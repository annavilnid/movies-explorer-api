const mongoose = require('mongoose');
// const { urlRegG } = require('../constants/constants');

const userSchema = new mongoose.Schema({
  /* country: {
    type: String,
    // required: [true, 'Введите название страны'],
  },
  director: {
    type: String,
    // required: [true, 'Введите имя режиссера'],
  },
  duration: {
    type: Number,
    // required: [true, 'Введите длительность фильма'],
  },
  year: {
    type: String,
    // required: [true, 'Введите год выпуска фильма'],
  },
  description: {
    type: String,
    // required: [true, 'Введите описание фильма'],
  },
  image: {
    type: String,
    // required: [true, 'Введите ссылку на постер к фильму'],
    validate: {
      validator(v) {
        return urlRegG.test(v);
      },
      message: 'Введен некорректный формат ссылки',
    },
  },
  trailer: {
    type: String,
    // required: [true, 'Введите ссылку на трейлер к фильму'],
    validate: {
      validator(v) {
        return urlRegG.test(v);
      },
      message: 'Введен некорректный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    // required: [true, 'Введите ссылку на миниатюрное изображение постера к фильму'],
    validate: {
      validator(v) {
        return urlRegG.test(v);
      },
      message: 'Введен некорректный формат ссылки',
    },
  }, */
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  /* movieId: {
    type: Number,
    // required: true,
  }, */
  nameRU: {
    type: String,
    required: [true, 'Введите название фильма на русском языке'],
  },
  /* nameEN: {
    type: String,
    // required: [true, 'Введите название фильма на английском языке'],
  }, */
});

module.exports = mongoose.model('movie', userSchema);
