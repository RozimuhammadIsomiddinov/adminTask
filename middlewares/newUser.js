import { addUser } from "../database/users.js";

export const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Kerakli ma'lumotlarni tekshirish
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Iltimos, ism, email, va parolni kiriting." });
  }

  try {
    // Foydalanuvchini yaratish
    const user = await addUser(name, email, password);

    // Yaratilgan foydalanuvchini JSON formatida olish
    const userData = user.toJSON();

    // Yaratilgan foydalanuvchini javobga qo'shish
    res
      .status(201)
      .json({ message: "Foydalanuvchi yaratildi.", user: userData });
    next();
  } catch (error) {
    console.error("Foydalanuvchi yaratishda xato:", error.message);
    res
      .status(500)
      .json({ message: "Foydalanuvchi yaratishda xato yuz berdi." });
  }
};
