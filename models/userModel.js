import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

// validation for email
const isEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLenth: 3,
  },
  lastName: {
    type: String,
    required: true,
    minLenth: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    minLenth: 6,
    required: true,
  },
});

const User = model("User", userSchema);

export default User;
