const { ERROR_TYPE, STSTUS_CODE } = require('../constants/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = ERROR_TYPE.FORBIDDEN;
    this.statusCode = STSTUS_CODE.FORBIDDEN_CODE;
  }
}

module.exports = ForbiddenError;
