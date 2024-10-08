import { addUser } from "../database/users.js";

export const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Iltimos, ism, email, va parolni kiriting." });
  }

  try {
    const user = await addUser(name, email, password);

    const userData = user.toJSON();

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
