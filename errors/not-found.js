import { StatusCodes } from 'http-status-codes';
import CustomAPIEror from './cutom-api.js';

class NotFoundError extends CustomAPIEror {
    constructor(message) {
      super(message)
      this.statusCode = StatusCodes.NOT_FOUND
    }
  }
  export default NotFoundError