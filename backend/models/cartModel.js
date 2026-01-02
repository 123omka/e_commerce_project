import db from "../config/db.js";

/* ===============================
   GET OR CREATE CART
================================ */
export const getOrCreateCart = async (userId) => {
  const [rows] = await db.execute(
    "SELECT * FROM carts WHERE user_id=?",
    [userId]
  );

  if (rows.length) return rows[0];

  await db.execute(
    "INSERT INTO carts (user_id) VALUES (?)",
    [userId]
  );

  const [newRows] = await db.execute(
    "SELECT * FROM carts WHERE user_id=?",
    [userId]
  );

  return newRows[0];
};

/* ===============================
   GET CART ITEMS
================================ */
export const getCartItems = async (cartId) => {
  const [rows] = await db.execute(
    `
    SELECT 
      ci.id,
      ci.quantity,
      p.id AS productId,
      p.name,
      p.price,
      p.image AS imageUrl
    FROM cart_items ci
    JOIN products p ON p.id = ci.product_id
    WHERE ci.cart_id = ?
    `,
    [cartId]
  );

  return rows;
};

/* ===============================
   ADD ITEM TO CART
================================ */
export const addItemToCart = async (cartId, productId, qty) => {
  const [rows] = await db.execute(
    "SELECT * FROM cart_items WHERE cart_id=? AND product_id=?",
    [cartId, productId]
  );

  if (rows.length) {
    const [result] = await db.execute(
      "UPDATE cart_items SET quantity = quantity + ? WHERE id=?",
      [qty, rows[0].id]
    );
    return result;
  }

  const [result] = await db.execute(
    "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?,?,?)",
    [cartId, productId, qty]
  );

  return result;
};

/* ===============================
   UPDATE CART QUANTITY
================================ */
export const updateCartQuantity = async (id, qty) => {
  const [result] = await db.execute(
    "UPDATE cart_items SET quantity=? WHERE id=?",
    [qty, id]
  );
  return result;
};

/* ===============================
   REMOVE CART ITEM
================================ */
export const removeCartItem = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM cart_items WHERE id=?",
    [id]
  );
  return result;
};

/* ===============================
   CLEAR CART ITEMS
================================ */
export const clearCartItems = async (cartId) => {
  const [result] = await db.execute(
    "DELETE FROM cart_items WHERE cart_id=?",
    [cartId]
  );
  return result;
};
