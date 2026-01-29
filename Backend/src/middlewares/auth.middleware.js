import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "unauthorized request" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded._id || decoded.exp * 1000 < Date.now()) {
      return res.status(401).json({ msg: "unauthorized request" });
    }
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "unauthorized request", err });
  }
};
