import { removeProductFromCart } from "../../database/carts";

export const deleteFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const result = await removeProductFromCart(userId, productId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
