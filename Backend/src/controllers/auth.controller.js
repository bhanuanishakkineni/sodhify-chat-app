import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { sendWelcomeEmail } from "../utils/emails/emailHandler.js";

const authController = () => {
  const signup = async (req, res) => {
    const { email, fullName, password } = req.body;
    try {
      if (!email || !fullName || !password) {
        return res
          .status(400)
          .json({ msg: "Error: Missing fields while sign up" });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ msg: "Invalid email" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password must be atleast 6 characters long" });
      }
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ msg: "User with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        email,
        fullName,
        password: hashedPassword,
      });
      await newUser.save();
      generateToken(newUser, res);
      res.status(201).json({
        msg: "Sign up successful",
        data: {
          _id: newUser._id,
          fullName,
          email,
        },
      });
      try {
        await sendWelcomeEmail(
          newUser.email,
          newUser.fullName,
          process.env.CLIENT_URL,
        );
      } catch (emailErr) {
        console.error("Error sending welcome email:", emailErr);
      }
    } catch (err) {
      res.status(500).json({ msg: "Server error during sign up" });
      console.error("Error during sign up:", err);
    }
  };
  const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res
          .status(400)
          .json({ msg: "Error: Missing fields while sign in" });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ msg: "Invalid email" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid email or password" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid email or password" });
      }
      const { token } = generateToken(user, res);
      res.status(200).json({
        msg: "Sign in successful",
        data: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        },
        token
      });
    } catch (err) {
      res.status(500).json({ msg: "Server error during sign in" });
    }
  };
  const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });
    res.status(200).json({ msg: "Sign out successful" });
  };
  return { signup, login, logout };
};

export default authController;
