import { StatusCodes } from "http-status-codes";
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    // [Http Status Codes](https://www.npmjs.com/package/http-status-codes)

    StatusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later.",
  };
  if (err.name === "ValidationError") {
    defaultError.StatusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(","); //iterate and restructure
  }
  if (err.code && err.code === 11000) {
    defaultError.StatusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(err.keyValue)} has to be unique.`
  }
  res.status(defaultError.StatusCode).json({ msg: defaultError.msg });

};
export default errorHandlerMiddleware;
