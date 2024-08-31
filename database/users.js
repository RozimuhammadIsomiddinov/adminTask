import User from "./models/user.js";
import { getSalt } from "./hash.js";

export const addUser = async (name, email, password) => {
  try {
    const hashedPassword = await getSalt(password);

    // Create a new user with the hashed password
    const user = await User.create({ name, email, password: hashedPassword });

    return user;
  } catch (error) {
    console.error("Error creating user:", error.message);
  }
};
