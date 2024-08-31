import jwt from "jsonwebtoken";

// Tokenni tekshirish uchun middleware
export const checkerToken = async (req, res, next) => {
  const token = req.headers["x-user-token"];
  if (!token) return res.status(400).send("Token not found!!!");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send(err.message);
  }
};
