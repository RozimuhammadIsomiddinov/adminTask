import express from "express";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import Product from "./database/models/product.js";
import User from "./database/models/user.js";
import Cart from "./database/models/cart.js";

AdminJS.registerAdapter(AdminJSSequelize);

const AdminJSOptions = {
  resources: [
    {
      resource: Product,
      options: {
        properties: {
          id: { isId: true },
          name: { type: "string", maxLength: 255, isTitle: true },
          description: { type: "textarea" },
          price: { type: "number" },
          stock: { type: "number" },
        },
      },
    },
    {
      resource: User,
      options: {
        properties: {
          id: { isId: true },
          name: { type: "string", isTitle: true },
          email: { type: "string" },
          password: {
            type: "password",
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false,
            },
          },
        },
      },
    },
    {
      resource: Cart,
      options: {
        properties: {
          id: { isId: true },
          quantity: { type: "number" },
          createdAt: { isVisible: false },
          updatedAt: { isVisible: false },
        },
      },
    },
  ],
  rootPath: "/admin",
};

const adminJs = new AdminJS(AdminJSOptions);
const adminRouter = AdminJSExpress.buildRouter(adminJs);

const app = express();

app.use(adminJs.options.rootPath, adminRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
