import Cart from "./models/cart.js";

export const addProductToCart = async (userId, productId, quantity = 1) => {
  try {
    const cartItem = await Cart.findOne({
      where: { UserId: userId, ProductId: productId },
    });

    if (cartItem) {
      // Agar mahsulot allaqachon savatda bo'lsa, miqdorini oshirish
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      await Cart.create({ UserId: userId, ProductId: productId, quantity });
    }

    console.log("Mahsulot savatga qo'shildi.");
  } catch (error) {
    console.error("Savatga mahsulot qo'shishda xato:", error.message);
  }
};
export const removeProductFromCart = async (userId, productId) => {
  try {
    const cartItem = await Cart.findOne({
      where: { UserId: userId, ProductId: productId },
    });

    if (cartItem) {
      await cartItem.destroy();
      console.log("Mahsulot savatdan o'chirildi.");
    } else {
      console.log("Mahsulot savatda topilmadi.");
    }
  } catch (error) {
    console.error("Mahsulotni savatdan o'chirishda xato:", error.message);
  }
};
export const getUserCart = async (userId) => {
  try {
    const cartItems = await Cart.findAll({
      where: { UserId: userId },
      include: [Product],
    });

    return cartItems;
  } catch (err) {
    console.error("Savatni olishda xato:", err.message);
  }
};
