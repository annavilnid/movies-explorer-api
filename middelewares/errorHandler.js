const { ERROR_MESSAGE, STSTUS_CODE } = require('../constants/constants');

const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(STSTUS_CODE.SERVER_ERR_CODE).send({ message: ERROR_MESSAGE.SERVER_ERR_MSG });
  }
  next();
};

module.exports = { errorHandler };
