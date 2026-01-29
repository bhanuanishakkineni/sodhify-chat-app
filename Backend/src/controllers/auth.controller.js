import { User } from "../models/user.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/generateToken.js";

const authController = () => {
    const signup = async (req, res) => {
        const { email, fullName, password } = req.body;
        try {
            if (!email || !fullName || !password) {
                res.status(400).json({ msg: "Error: Missing fields while sign up" });
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                res.status(400).json({msg: "Invalid email"});
            }
            if (password.length < 6) {
                res.status(400).json({msg: "Password must be atleast 6 characters long"});
            }
            const user = await User.findOne({ email });
            if (user) {
                res.status(400).json({ msg: "User with this email already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = User({
                email,
                fullName,
                password: hashedPassword
            });
            await newUser.save();
            generateToken(newUser, res);
            res.status(201).json({ msg: "Sign up successful", data: {
                _id: newUser._id,
                fullName,
                email
            }});
        } catch (err) {
            res.status(500).json({ msg: "Server error during sign up"});
            console.error("Error during sign up:", err);
        }
    };
    const signin = async (req, res) => {
        res.status(200).json({ msg: "Sign in successful" });
    };
    return { signup, signin };
};

export default authController;