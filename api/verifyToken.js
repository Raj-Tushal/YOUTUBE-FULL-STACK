import jwt from "jsonwebtoken";
import { createError } from "./error.js";

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("Access Token:", res.cookies);
  console.log("Token:", token); // Log the token for debugging
  if (!token) return next(createError(404, "User not authenticated"));
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid"));
    console.log("Decoded User:", user); // Log the decoded user
    req.user = user;
    next();
  });
};


export default verifyToken;
