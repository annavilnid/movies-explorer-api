const router = require('express').Router();
const userRouter = require('./user');
const moviesRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middelewares/auth');
const { validateCreateUser, validateLogin } = require('../middelewares/validator');
const NotFoundError = require('../errors/NotFoundError');
const { ERROR_MESSAGE } = require('../constants/constants');

// роуты которым не нужна авторизация
router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

// роуты которым нужна авторизация
router.use('/users', userRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  next(new NotFoundError(ERROR_MESSAGE.NOT_FOUND));
});

module.exports = router;
