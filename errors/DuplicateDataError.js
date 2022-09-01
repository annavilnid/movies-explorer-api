const { ERROR_TYPE, STSTUS_CODE } = require('../constants/constants');

class DuplicateDataError extends Error {
  constructor(message) {
    super(message);
    this.name = ERROR_TYPE.DUPLICATE;
    this.statusCode = STSTUS_CODE.DUP_DATA_CODE;
  }
}

module.exports = DuplicateDataError;
