import { getProductById } from "../../database/products.js";

export const getOneMid = async (req, res) => {
  try {
    const result = await getProductById(req.params.id);

    if (result.length === 0) {
      return res.status(404).json({ message: "this product have not!" });
    }
    res.status(200).json(result);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error from getOneMid", error: err.message });
  }
};
