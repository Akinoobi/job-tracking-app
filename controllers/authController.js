import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes';
const register = async(req, res) => {
  const {name, email, password} = req.body
    if (!name || !email || !password) {
      throw new Error(`Please provide all field`)
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
