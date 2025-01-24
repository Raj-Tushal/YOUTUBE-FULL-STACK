import Users from "../models/users.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

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

    // finding document of the matchign user from db
    const dbUser = await Users.findOne({ email: req.body.email });
    if (!dbUser) return next(createError(404, "user not exists"));

    // hashed passwrod of user in db
    const hash = dbUser.password;

    //  checking if user exist
    const isUser = await bcrypt.compare(req.body.password, hash);
    if (!isUser) return next(createError(400, "wrong credintials"));

    // generating token
    const token = jwt.sign({ id: dbUser._id }, process.env.JWT);
if (!token) return next(createError(400, "cannot get  token"));
    //  not to display password to user
    let { password, ...otherDetails } = dbUser._doc;

   const cookieOptions = {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      sameSite: "none" ,
      httpOnly: true,
      secure: true,
    };
    return res
      .status(201)
      .cookie("token", token, cookieOptions)

      .json({
          ...otherDetails,
      token,
      })


  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    console.log("Checking if user exists for email:", req.body.email);
    
    const user = await Users.findOne({ email: req.body.email });

    if (user) {
      console.log("User exists in the database:", user);
      
      // Generate a token for the existing user
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      
      res.send({
      user,
        token,
      })
    } else {
      console.log("Creating a new Google user with details:", req.body);
      
      // Create a new user
      const newUser = new Users({ ...req.body, fromGoogle: true });
      const savedUser = await newUser.save();
      
      console.log("New Google user created:", savedUser);
      
      // Generate a token for the new user
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      
      res.send({
        savedUser,
        token,
      })
    }
  } catch (error) {
    console.error("Error during Google authentication:", error);
    next(createError(400, error.message || "Something went wrong during Google authentication."));
  }
};
