import express from "express";
import dotenv from "dotenv";

import { getMid } from "./middlewares/product/getAllProduct.js";
import { getOneMid } from "./middlewares/product/getOneProduct.js";

import { createMid } from "./middlewares/product/createProduct.js";
import { updateMid } from "./middlewares/product/updateProduct.js";
import { deleteMid } from "./middlewares/product/deleteProduct.js";

import { createUser } from "./middlewares/newUser.js";
import { viewCart } from "./middlewares/cart/viewCart.js";
import { addToCart } from "./middlewares/cart/addToCart.js";
import { deleteFromCart } from "./middlewares/cart/deleteFromCart.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app
  .get("/products", getMid)
  .get("/products/:id", getOneMid)
  .post("/products/add", createMid)
  .put("/products/:id", updateMid)
  .delete("/products/:id", deleteMid)
  .get("/view-cart/:id", viewCart)
  .post("/add-carts/:id", addToCart)
  .post("/login", createUser)
  .delete("/remove-cart/:id", deleteFromCart)
  .listen(port, () => {
    console.log(`${port} port started listening`);
  });
