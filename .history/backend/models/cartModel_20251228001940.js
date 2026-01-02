import db from "../config/db.js";

export const getOrCreateCart = (userId, cb) => {
  db.query("SELECT * FROM carts WHERE user_id=?", [userId], (err, rows) => {
    if (rows.length) return cb(null, rows[0]);

    db.query("INSERT INTO carts (user_id) VALUES (?)", [userId], () => {
      db.query("SELECT * FROM carts WHERE user_id=?", [userId], cb);
    });
  });
};

export const getCartItems = (cartId, cb) => {
  db.query(`
    SELECT 
      ci.id,
      ci.quantity,
      p.id AS productId,
      p.name,
      p.price,
      p.imageUrl
    FROM cart_items ci
    JOIN products p ON p.id = ci.product_id
    WHERE ci.cart_id = ?
  `, [cartId], cb);
};

export const addItemToCart = (cartId, productId, qty, cb) => {
  db.query(
    "SELECT * FROM cart_items WHERE cart_id=? AND product_id=?",
    [cartId, productId],
    (err, rows) => {
      if (rows.length) {
        db.query(
          "UPDATE cart_items SET quantity = quantity + ? WHERE id=?",
          [qty, rows[0].id],
          cb
        );
      } else {
        db.query(
          "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?,?,?)",
          [cartId, productId, qty],
          cb
        );
      }
    }
  );
};

export const updateCartQuantity = (id, qty, cb) => {
  db.query("UPDATE cart_items SET quantity=? WHERE id=?", [qty, id], cb);
};

export const removeCartItem = (id, cb) => {
  db.query("DELETE FROM cart_items WHERE id=?", [id], cb);
};

export const clearCartItems = (cartId, cb) => {
  db.query("DELETE FROM cart_items WHERE cart_id=?", [cartId], cb);
};
