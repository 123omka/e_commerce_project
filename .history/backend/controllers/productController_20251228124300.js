import fs from "fs";
import path from "path";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../models/productModel.js";

/* ===============================
   CREATE PRODUCT
================================ */
export const addProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    await createProduct({
      name,
      price,
      description,
      stock,
      image: req.file.filename
    });

    res.status(201).json({ message: "Product created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   READ PRODUCTS
================================ */
export const fetchProducts = async (req, res) => {
  try {
     const search = req.query.search || "";
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   UPDATE PRODUCT (IMAGE REPLACE)
================================ */
export const editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, description, stock } = req.body;

    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let image = product.image;

    // Replace image if new file uploaded
    if (req.file) {
      const oldPath = path.join("uploads", image);

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      image = req.file.filename;
    }

    await updateProduct(id, {
      name,
      price,
      description,
      stock,
      image
    });

    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   DELETE PRODUCT + IMAGE
================================ */
export const removeProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const imagePath = path.join("uploads", product.image);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await deleteProduct(id);

    res.json({ message: "Product & image deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
