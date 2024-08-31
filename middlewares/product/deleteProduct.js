import { deleteProduct, getAllProducts } from "../../database/products.js";

export const deleteMid = async (req, res, next) => {
  try {
    const { id } = req.params;

    // `getAllProducts` funksiyasidan natijani olish
    const product = await getAllProducts(id); // returns object

    if (!product) {
      return res.status(404).send("Product not found in DB");
    }

    // Mahsulotni o'chirish
    const result = await deleteProduct(id); //returns array

    result.rowCount > 0 ? "Product deleted" : "No product found";
    next();
  } catch (er) {
    return res.status(400).send("Error from deleteMid: " + er.message);
  }
};
