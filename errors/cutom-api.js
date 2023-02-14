import { StatusCodes } from 'http-status-codes';

class CustomAPIEror extends Error {
    constructor(message) {
      super(message)
    }
  }
export default CustomAPIEror