// models/productModel.js
import  db  from "../config/db.js";

export const createProduct = (data, cb) => {
  const sql =
    "INSERT INTO products (name, description,price stock, image_url) VALUES (?, ?, ?, ?)";
  db.execute(sql, data, cb);
};
