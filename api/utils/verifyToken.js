import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

//First getting the token from the cookie named as access_token then using jwt to verify that
//If everything is okay, save the user to the req (req.user = user) and go to next()
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "Unauthorized"));
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));
    req.user = user;
    next();
  });
};
