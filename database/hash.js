import bcrypt from "bcrypt";

export const getSalt = async (password) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  } catch (error) {
    throw new Error(
      `Salt yaratishda yoki hash qilishda xato: ${error.message}`
    );
  }
};
