import db from "../config/db.js";

export const createProduct = async (data) => {
  const [result] = await db.execute(
    "INSERT INTO products (name, price, description, stock, image) VALUES (?, ?, ?, ?, ?)",
    [data.name, data.price, data.description, data.stock, data.image]
  );
  return result;
};

export const getAllProducts = async () => {
  const [rows] = await db.execute(
    "SELECT * FROM products ORDER BY id DESC"
  );
  return rows;
};

export const getProductById = async (id) => {
  const [rows] = await db.execute(
    "SELECT * FROM products WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const updateProduct = async (id, data) => {
  const [result] = await db.execute(
    "UPDATE products SET name=?, price=?, description=?, stock=?, image=? WHERE id=?",
    [data.name, data.price, data.description, data.stock, data.image, id]
  );
  return result;
};

export const deleteProduct = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM products WHERE id=?",
    [id]
  );
  return result;
};

export const decreaseStock = async (productId, qty) => {
  const [result] = await db.execute(
    "UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?",
    [qty, productId, qty]
  );
  return result;
};
