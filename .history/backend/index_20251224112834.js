// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// // health
// app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/uploads", express.static("uploads"));
app.use("/api/products/create", productRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
