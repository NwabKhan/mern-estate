import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({
      message: "User Created succesfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email }); //Checking is the email exits in db
    if (!validUser) {
      return next(errorHandler(404, "User not Found!"));
    }
    const validatePass = bcrypt.compareSync(password, validUser.password);
    if (!validatePass) {
      return next(errorHandler(401, "Password is incorrect!"));
    }

    // Creating a token and storing that in cookie
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);

    // extrating the Password, as we send back, it shows and we don't want to show pass
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

//With signin/up with goiogle first we are checking, if the user already exits in db,
// just give him an access token if now so, then create a new user.
//Also for creating a new user pass is mendatory, so we set pass by ourself
export const google = async (req, res, next) => {
  const { username, email, photo } = req.body;
  try {
    const validUser = await User.findOne({ email }); //Checking is the email exits in db
    if (validUser) {
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      //16 diggit pass (Make pass of 0-9, a-z and give me last 8 digit + same)
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 8);

      //Generating unique user name
      const generatedUsername =
        username.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);
      const newUser = new User({
        username: generatedUsername,
        email,
        password: hashedPassword,
        photo,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
