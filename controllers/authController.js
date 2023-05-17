import { hashPassword, comparePassword } from "../helpers/hashPassword.js";
import pkg from "jsonwebtoken";
const { sign } = pkg;
import User from "../models/userModel.js";
const registerController = (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // validation
  if (!email || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  // check if user already exists

  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: "User already exists" });
    }
    const user = new User({
      email,
      password: hashPassword(password),
      firstName,
      lastName,
    });
    user
      .save()
      .then((user) => {
        const token = sign({ _id: user._id }, "ajayroy03377");
        res.json({
          user: user,
          token: token,
          message: "user created successfully",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const loginController = (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res.status(302).json({ error: "Please add email" });
    }
    if (!password) {
      return res.status(302).json({ error: "Please add password" });
    }
    User.findOne({ email: email })
      .then((savedUser) => {
        if (!savedUser) {
          return res.status(302).json({ error: "Invalid email" });
        }
        const isMatch = comparePassword(password, savedUser.password);
        if (isMatch) {
          const token = sign({ _id: savedUser._id }, "ajayroy03377");
          return res.json({
            user: savedUser,
            token: token,
            message: "Successfully signed in",
          });
        } else {
          return res.status(302).json({ error: "Invalid password" });
        }
      })
      .catch((err) => {
        res.status(302).json({
          message: "Invalid email or password",
          error: err,
        });
      });
  } catch (err) {
    console.log(err);
  }
};

const protectHomePage = (req, res) => {
  res.status(202).send({
    ok: true,
  });
};

export { registerController, loginController, protectHomePage };

//dno9b1bLpn1IQMRR
