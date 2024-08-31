import bcrypt from "bcrypt"; // yoki hash qilish uchun boshqa kutubxona
import User from "../database/models/user.js";

export const checkUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Email, parol, va ismingizni kiriting." });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi." });
    }

    // Parolni tekshirish
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Noto'g'ri parol." });
    }

    // Keyingi middleware yoki funktsiyaga o'tish
    req.user = user; // Agar kerak bo'lsa, foydalanuvchi ma'lumotlarini saqlash
    next();
  } catch (error) {
    console.error("Xato:", error.message);
    res.status(500).json({ message: "Serverda xato yuz berdi." });
  }
};
