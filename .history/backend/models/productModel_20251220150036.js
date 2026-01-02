// models/productModel.js
import  db  from "../config/db.js";

export const createProduct = (data, cb) => {
  const sql =
    "INSERT INTO products (name, description,price, stock, image_url,image_public_id) VALUES (?,?, ?, ?, ?)";
  db.execute(sql, data, cb);
};
