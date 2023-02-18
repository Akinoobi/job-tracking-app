import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError(`Please provide all field`);
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use.");
  }
  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  }); // [Http Status Codes](https://www.npmjs.com/package/http-status-codes)
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  console.log("user", user);
  user.password = undefined
  res.send(
    res.status(StatusCodes.OK).json({
      user,
      token,
      location: user.location,
    })
  );
};
const updateUser = (req, res) => {
  res.send("updateUser");
};

export { register, login, updateUser };
