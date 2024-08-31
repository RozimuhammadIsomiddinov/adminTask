import { updateProduct, getProductById } from "../../database/products.js";

export const updateMid = async (req, res, next) => {
  try {
    const { name, description, price, stock } = req.body;
    const { id } = req.params;

    // Mahsulotni yangilash
    const updateResult = await updateProduct(
      id,
      name,
      description,
      price,
      stock
    );

    if (updateResult.error) {
      return res
        .status(400)
        .send(`Error updating product:\n${updateResult.error}`);
    }

    // Yangilangan mahsulotni qidirish
    const updatedProduct = await getProductById(id);

    if (!updatedProduct) {
      return res.status(404).send("Product not found after update");
    }

    res.status(200).json({
      message: "Successfully updated",
      product: updatedProduct,
    });

    // Keyingi middleware'ga o'tish
    next();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Error from updateMid", error: err.message });
  }
};
