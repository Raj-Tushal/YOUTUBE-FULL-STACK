import Users from "../models/users.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";

// signUp
export const signUp = async (req, res, next) => {
  try {
    console.log(req.body);
    const myPlaintextPassword = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(myPlaintextPassword, salt);

    const newUser = new Users({ ...req.body, password: hashPass });
    const newUserData = await newUser.save();

    res.send({
      message: "new user created succesfully",
      newUser,
    });
  } catch (err) {
    next(err);
  }
};

// signIn
export const signIn = async (req, res, next) => {
  try {
    // getting user's email and password
    const { email, password } = req.body;

    // finding document of the matchign user from db
    const dbUser = await Users.findOne({  email: email });
    if (!dbUser) return next(createError(404, "user not exists"));

    // hashed passwrod of user in db
    const hash = dbUser.password;

    //  checking if user exist
    const isUser = await bcrypt.compare(password, hash);

    if (!isUser) return next(createError(400, "wrong credintials"));

    res.send({
      message: "user logged in succesfuly",
    });
  } catch (err) {
    next(err);
  }
};
