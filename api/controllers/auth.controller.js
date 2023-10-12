import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = new User({ username, email, password: hashedPassword });
 try {
    await newUser.save();
    res.status(201).json({
      message: "User Created succesfully!",
    });
 } catch (error) {
    res.status(500).json({
        message: "Error Happens",
      });
 }
};
