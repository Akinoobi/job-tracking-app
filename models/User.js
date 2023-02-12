import mongoose, { Mongoose } from "mongoose";
import validator from "validator";

const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "Please provide name"],
    validate: {
        validator: validator.isEmail,
        message: 'provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 6,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "lastName",
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "my city",
  },
});

export default mongoose.model('User', UserSchema)
