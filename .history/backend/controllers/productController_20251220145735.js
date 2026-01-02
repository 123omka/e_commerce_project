// controllers/productController.js
import cloudinary from "../config/cloudinary.js";
import { createProduct } from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    const uploadResult = await cloudinary.v2.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
    );

    createProduct(
      [name, description, pricestock, uploadResult.secure_url],
      (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Product created successfully" });
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};
