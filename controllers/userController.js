import User from "../mongodb/models/user.js";
import Trash from "../mongodb/models/trash.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(404).json({ message: "password not correct" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
export const registerUser = async (req, res) => {
  const data = req.body;
  const email = data.email;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "User already exist" });
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const newUser = await User.create({ ...data, password: hashedPassword });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
export const getMe = async (req, res) => {
  try {
  } catch (error) {}
};
