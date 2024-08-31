import { addProduct } from "../../database/products.js";

export const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.params.id;

  try {
    const result = await addProduct(userId, productId, quantity);
    res.status(200).json(result);
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
