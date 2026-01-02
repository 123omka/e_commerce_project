import fs from "fs";
import path from "path";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../models/productModel.js";

/* CREATE PRODUCT */
export const addProduct = (req, res) => {
  const { name, price, description, stock } = req.body;
  if (!req.file)
    return res.status(400).json({ message: "Image required" });

  createProduct(
    { name, price, description, stock, image: req.file.filename },
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Product created" });
    }
  );
};

/* READ PRODUCTS */
export const fetchProducts = (req, res) => {
  getAllProducts((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

/* UPDATE PRODUCT (IMAGE REPLACE) */
export const editProduct = (req, res) => {
  const id = req.params.id;
  const { name, price, description, stock } = req.body;

  getProductById(id, (err, result) => {
    if (err || result.length === 0)
      return res.status(404).json({ message: "Product not found" });

    let image = result[0].image;

    if (req.file) {
      const oldPath = path.join("uploads", image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      image = req.file.filename;
    }

    updateProduct(
      id,
      { name, price, description, stock, image },
      (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Product updated" });
      }
    );
  });
};

/* DELETE PRODUCT + IMAGE */
export const removeProduct = (req, res) => {
  const id = req.params.id;

  getProductById(id, (err, result) => {
    if (err || result.length === 0)
      return res.status(404).json({ message: "Product not found" });

    const imagePath = path.join("uploads", result[0].image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    deleteProduct(id, (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product & image deleted" });
    });
  });
};
