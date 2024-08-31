import { addProduct, getProductById } from "../../database/products.js";

export const createMid = async (req, res, next) => {
  const { name, description, price, stock } = req.body;
  try {
    const result = await addProduct(name, description, price, stock);

    if (result.error) {
      return res.status(401).send("Error from add:\n" + result.error);
    }

    const product = await getProductById(result.id);

    if (!product) {
      return res.status(404).send("Product not found after creation");
    }

    res.status(201).send(`Successfully added:\n${JSON.stringify(product)}`);
    next();
  } catch (err) {
    return res.status(400).send("Error from createMid:\n" + err.message);
  }
};
