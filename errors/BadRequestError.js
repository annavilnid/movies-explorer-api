const { ERROR_TYPE, STSTUS_CODE } = require('../constants/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = ERROR_TYPE.BAD_REQST;
    this.statusCode = STSTUS_CODE.BAD_REQST_CODE;
  }
}

module.exports = BadRequestError;
