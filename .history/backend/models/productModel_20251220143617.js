// models/productModel.js
import { db } from "../config/db.js";

export const createProduct = (data, cb) => {
  const sql =
    "INSERT INTO products (name, description, stock, image_url) VALUES (?, ?, ?, ?)";
  db.exe(sql, data, cb);
};
