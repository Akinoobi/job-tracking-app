import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes';
import {BadRequestError} from '../errors/index.js'



const register = async(req, res) => {
  const {name, email, password} = req.body
    if (!name || !email || !password) {
      throw new BadRequestError(`Please provide all field`)
    }
    const userAlreadyExists = await User.findOne({email})
    if (userAlreadyExists) {
      throw new BadRequestError('Email already in use.')
    }
    const user = await User.create(req.body)
    res.status(StatusCodes.OK).json({ user }) // [Http Status Codes](https://www.npmjs.com/package/http-status-codes)

};
const login = (req, res) => {
  res.send("login user");
};
const updateUser = (req, res) => {
  res.send("updateUser");
};

export { register, login, updateUser };
