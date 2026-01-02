import db from "../config/db.js";

export const createOrder = (data, cb) => {
  db.query(
    "INSERT INTO orders (user_id, total, name, address, phone) VALUES (?,?,?,?,?)",
    [data.userId, data.total, data.name, data.address, data.phone],
    cb
  );
};

export const insertOrderItems = (orderId, items, cb) => {
  const values = items.map(i => [
    orderId,
    i.productId,
    i.price,
    i.quantity
  ]);

  db.query(
    "INSERT INTO order_items (order_id, product_id, price, quantity) VALUES ?",
    [values],
    cb
  );
};
