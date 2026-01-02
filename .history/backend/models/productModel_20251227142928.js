import  db  from "../config/db.js";

export const createProduct = (data, cb) => {
  db.query(
    "INSERT INTO products (name, price, description, stock, image) VALUES (?, ?, ?, ?, ?)",
    [data.name, data.price, data.description, data.stock, data.image],
    cb
  );
};

export const getAllProducts = (cb) => {
  db.query("SELECT * FROM products ORDER BY id DESC", cb);
};

export const getProductById = (id, cb) => {
  db.query("SELECT * FROM products WHERE id = ?", [id], cb);
};

export const updateProduct = (id, data, cb) => {
  db.query(
    "UPDATE products SET name=?, price=?, description=?, stock=?, image=? WHERE id=?",
    [data.name, data.price, data.description, data.stock, data.image, id],
    cb
  );
};

export const deleteProduct = (id, cb) => {
  db.query("DELETE FROM products WHERE id=?", [id], cb);
};

export const decreaseStock = (productId, qty, cb) => {
  db.query(
    "UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?",
    [qty, productId, qty],
    cb
  );
};