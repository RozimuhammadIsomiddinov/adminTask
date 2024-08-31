import jwt from "jsonwebtoken";
import User from "../database/models/user.js";
import dotenv from "dotenv";

dotenv.config();

// Token generatsiya qilish
export const generateToken = async (email, secretKey) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: "1h",
    });

    return token;
  } catch (err) {
    throw new Error(`Error generating token: ${err.message}`);
  }
};
