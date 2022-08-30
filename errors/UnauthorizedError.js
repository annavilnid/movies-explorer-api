const { ERROR_TYPE, STSTUS_CODE } = require('../constants/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = ERROR_TYPE.UNAUTH;
    this.statusCode = STSTUS_CODE.UNAUTH_CODE;
  }
}

module.exports = UnauthorizedError;
