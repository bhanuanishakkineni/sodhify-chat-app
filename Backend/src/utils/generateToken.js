import jwt from "jsonwebtoken";
import moment from "moment";

export const generateToken = (user, res) => {
  const expiry = moment()
    .add(process.env.TOKEN_EXPIRY || 7, process.env.TOKEN_EXPIRY_UNIT || "days")
    .format();
  const token_payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
  };
  const token = jwt.sign(token_payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.TOKEN_EXPIRY || "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: process.env.TOKEN_EXPIRY * 24 * 60 * 60 * 1000, // converting days to milliseconds,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return { token };
};
