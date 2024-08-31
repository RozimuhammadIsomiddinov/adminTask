import { DataTypes } from "sequelize";
import sequelize from "./config.js";
import User from "./user.js";
import Product from "./product.js";

const Cart = sequelize.define(
  "Cart",
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

// connections
User.belongsToMany(Product, { through: Cart });
Product.belongsToMany(User, { through: Cart });

export default Cart;
