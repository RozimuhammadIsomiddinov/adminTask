import { getUserCart } from "../../database/carts.js";

export const viewCart = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const cartItems = await getUserCart(userId);
    res
      .status(200)
      .json(!cartItems ? "xali mahsulot zakas qilmadingiz" : cartItems);
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
