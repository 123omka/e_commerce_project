import db from "../config/db.js";

/* ===============================
   CREATE ORDER
================================ */
export const createOrder = async (data) => {
  const [result] = await db.execute(
    "INSERT INTO orders (user_id, total, name, address, phone) VALUES (?,?,?,?)",
    [data.userId, data.total,  data.address, data.phone]
  );
  return result;
};

/* ===============================
   INSERT ORDER ITEMS
================================ */
export const insertOrderItems = async (orderId, items) => {
  const values = items.map(i => [
    orderId,
    i.productId,
    i.price,
    i.quantity
  ]);

  const [result] = await db.query(
    "INSERT INTO order_items (order_id, product_id, price, quantity) VALUES ?",
    [values]
  );

  return result;
};
