import { getOrCreateCart, getCartItems, clearCartItems } from "../models/cartModel.js";
import { createOrder, insertOrderItems } from "../models/orderModel.js";

export const checkout = (req, res) => {
  const { name, address, phone } = req.body;

  getOrCreateCart(req.user.id, (err, cart) => {
    getCartItems(cart.id, (err, items) => {
      const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

      createOrder(
        { userId: req.user.id, total, name, address, phone },
        (err, result) => {
          insertOrderItems(result.insertId, items, () => {
            clearCartItems(cart.id, () => {
              res.json({ message: "Order placed successfully" });
            });
          });
        }
      );
    });
  });
};
