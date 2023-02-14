import { StatusCodes } from 'http-status-codes';
import CustomAPIEror from './cutom-api.js';


class BadRequestError extends CustomAPIEror {
    constructor(message) {
      super(message)
      this.statusCode = StatusCodes.BAD_REQUEST
    }
  }
  export default BadRequestError;