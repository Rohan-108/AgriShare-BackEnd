import User from "../mongodb/models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const loginUser = async (req, res) => {
  const { email, pass } = req.body;
  if (!email || !pass) {
    res.status(400).json({ message: "please fill all fields" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(pass, existingUser.pass);
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
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(data.pass, salt);
    const newUser = await User.create({ ...data, pass: hashedPassword });
    const token = jwt.sign(
      { email: data.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const getMe = async (req, res) => {
  try {
  } catch (error) {}
};
