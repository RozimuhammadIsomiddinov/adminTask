import { getAllProducts } from "../../database/products.js";

export const getMid = async (req, res) => {
  try {
    const result = await getAllProducts();
    console.log(result);
    if (result.length == 0) {
      return res.status(404).json({ message: "Products have not yet!" });
    }
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(400).json({ message: "Error from getMid", error: err.message });
  }
};
