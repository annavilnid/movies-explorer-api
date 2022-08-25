const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  console.log('get movie');
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

// module.exports.createMovie = (req, res) => {
//   console.log('create movie');
//   const { nameRU } = req.body;
//   const owner = req.user._id;
//   // const owner = req.user._id;
//   Movie.create({
//     nameRU,
//     owner,
//   })
//     .then((movie) => {
//       console.log(movie);
//       res.status(666).send({ movie });
//     })
//     // eslint-disable-next-line consistent-return
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         return res.status(100).send({ message: err.message });
//       }
//       res.status(100).send({ message: 'Ошибка сервера' });
//     });
// };

module.exports.createMovie = (req, res, next) => {
  console.log('create movie');
  const {
    // country,
    // director,
    // duration,
    // year,
    // description,
    // image,
    // trailer,
    nameRU,
    // nameEN,
    // thumbnail,
    // movieId,
  } = req.body;
  // eslint-disable-next-line no-unused-vars
  const owner = req.user._id;
  console.log(owner);
  console.log(nameRU);
  Movie.create({
    // country,
    // director,
    // duration,
    // year,
    // description,
    // image,
    // trailer,
    nameRU,
    // nameEN,
    // thumbnail,
    // movieId,
    owner,
  })
    .then((movie) => res.status(666).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // next(new BadRequestError('Переданы некорректные данные при создании фильма'));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  console.log('delete movie');
  console.log(req.params.movieID);
  Movie.findById(req.params.movieID)
    .then((movie) => {
      console.log(movie);
      if (!movie) {
        // throw new NotFoundError('Фильм с указанным _id не найден');
      }
      console.log(movie.owner);
      console.log(req.user._id);
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        // throw new ForbiddenError('Недостаточно прав для удаления фильма');
      }
      return Movie.remove(movie);
    })
    .then(() => res.status(200).send({ message: 'Успешно' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        // next(new BadRequestError('Невалидный id'));
        return;
      }
      next(err);
    });
};
