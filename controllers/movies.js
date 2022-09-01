const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const { ERROR_MESSAGE, ERROR_TYPE, STSTUS_CODE } = require('../constants/constants');

module.exports.createMovie = (req, res, next) => {
  console.log('не работает');
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  console.log(req.body);
  console.log(req.user._id);
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(STSTUS_CODE.CREATE_CODE).send({ movie }))
    .catch((err) => {
      console.log(err);
      if (err.name === ERROR_TYPE.VALIDATION) {
        next(new BadRequestError(ERROR_MESSAGE.BAD_REQST_MSG));
        return;
      }
      next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(ERROR_MESSAGE.NOT_FOUND_MOVIE_MSG));
        return;
      }
      if (movie.owner.toString() !== req.user._id.toString()) {
        next(new ForbiddenError(ERROR_MESSAGE.FORBIDDEN_ERR_MSG));
      } else {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((data) => {
            res.send({ data });
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.CAST) {
        next(new BadRequestError(ERROR_MESSAGE.BAD_REQST_MSG));
        return;
      }
      next(err);
    });
};
