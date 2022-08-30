const { ERROR_TYPE, STSTUS_CODE } = require('../constants/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = ERROR_TYPE.NOT_FOUND;
    this.statusCode = STSTUS_CODE.NOT_FOUND_CODE;
  }
}

module.exports = NotFoundError;
