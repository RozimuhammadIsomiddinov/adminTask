import express from "express";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import Product from "./database/models/product.js"; // Product modelini import qilish
import User from "./database/models/user.js"; // User modelini import qilish
import Cart from "./database/models/cart.js"; // Cart modelini import qilish

// AdminJS va Sequelize adapterini ro'yxatdan o'tkazish
AdminJS.registerAdapter(AdminJSSequelize);

// AdminJS uchun sozlamalar
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
        // Qo'shimcha sozlamalar, agar kerak bo'lsa
      },
    },
  ],
  rootPath: "/admin",
};

// AdminJS routerini yaratish, autentifikatsiyasiz
const adminJs = new AdminJS(AdminJSOptions);
const adminRouter = AdminJSExpress.buildRouter(adminJs);

// Express ilovasini yaratish
const app = express();

// AdminJS paneli uchun routerni o'rnatish
app.use(adminJs.options.rootPath, adminRouter);

// Bosh sahifa uchun oddiy route
app.get("/", (req, res) => {
  res.send("Admin panelga kirish uchun /admin manziliga o'ting.");
});

// Serverni 3000-portda ishga tushirish
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
