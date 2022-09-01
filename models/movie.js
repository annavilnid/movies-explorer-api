const mongoose = require('mongoose');
const validator = require('validator');

const { MOVIE_SCHEMA } = require('../constants/constants');

const userSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, MOVIE_SCHEMA.COUNTRY],
  },
  director: {
    type: String,
    required: [true, MOVIE_SCHEMA.DIRECTOR],
  },
  duration: {
    type: Number,
    required: [true, MOVIE_SCHEMA.DURATION],
  },
  year: {
    type: String,
    required: [true, MOVIE_SCHEMA.YEAR],
  },
  description: {
    type: String,
    required: [true, MOVIE_SCHEMA.DESCRIPTION],
  },
  image: {
    type: String,
    required: [true, MOVIE_SCHEMA.IMAGE],
    validate: {
      validator: (v) => validator.isURL(v),
      message: MOVIE_SCHEMA.VALIDATE,
    },
  },
  trailerLink: {
    type: String,
    required: [true, MOVIE_SCHEMA.TRAILERLINK],
    validate: {
      validator: (v) => validator.isURL(v),
      message: MOVIE_SCHEMA.VALIDATE,
    },
  },
  thumbnail: {
    type: String,
    required: [true, MOVIE_SCHEMA.THUMBNAIL],
    validate: {
      validator: (v) => validator.isURL(v),
      message: MOVIE_SCHEMA.VALIDATE,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, MOVIE_SCHEMA.OWNER],
  },
  movieId: {
    type: Number,
    required: [true, MOVIE_SCHEMA.MOVIEID],
  },
  nameRU: {
    type: String,
    required: [true, MOVIE_SCHEMA.NAMERU],
  },
  nameEN: {
    type: String,
    required: [true, MOVIE_SCHEMA.NAMEEN],
  },
});

module.exports = mongoose.model('movie', userSchema);
