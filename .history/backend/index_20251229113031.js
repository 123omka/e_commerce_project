// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import productRoute from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

/* ✅ FIX __dirname FOR ES MODULES */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middlewares
app.use(cors());
app.use(express.json());

/* ✅ STATIC FILES — MUST BE BEFORE ROUTES */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
