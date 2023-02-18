import { StatusCodes } from 'http-status-codes';
import CustomAPIEror from './cutom-api.js';

class UnAuthenticatedError extends CustomAPIEror {
    constructor(message) {
      super(message)
      this.statusCode = StatusCodes.UNAUTHORIZED
    }
  }
  export default UnAuthenticatedError