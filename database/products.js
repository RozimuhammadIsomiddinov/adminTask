import Product from "./models/product.js";

// Create
export const addProduct = async (name, description, price, stock) => {
  try {
    const product = await Product.create({ name, description, price, stock });
    return product;
  } catch (error) {
    console.log(error.message);
  }
};

// Read
export const getAllProducts = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductById = async (id) => {
  try {
    const product = await Product.findByPk(id);
    return product;
  } catch (error) {
    console.log(error.message);
  }
};

// Update
export const updateProduct = async (id, name, description, price, stock) => {
  try {
    const product = await Product.findByPk(id);
    if (product) {
      product.name = name;
      product.description = description;
      product.price = price;
      product.stock = stock;
      await product.save();
      return product;
    } else {
      return { error: "Product not found" };
    }
  } catch (error) {
    console.log(error.message);
  }
};

// Delete
export const deleteProduct = async (id) => {
  try {
    const result = await Product.destroy({ where: { id } });
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
