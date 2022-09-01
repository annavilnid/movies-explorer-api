const router = require('express').Router();

const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movies');

const { validateCreateMovie, validateMovieId } = require('../middelewares/validator');

router.post('/', validateCreateMovie, createMovie);

router.get('/', getMovies);

router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
