import {
  getOrCreateCart,
  getCartItems,
  addItemToCart,
  updateCartQuantity,
  removeCartItem,
  clearCartItems
} from "../models/cartModel.js";

import { decreaseStock } from "../models/productModel.js";

/* ===============================
   FETCH CART
================================ */
export const fetchCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    const items = await getCartItems(cart.id);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart", error: err.message });
  }
};

/* ===============================
   ADD TO CART
================================ */
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const result = await decreaseStock(productId, quantity);

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    const cart = await getOrCreateCart(req.user.id);
    await addItemToCart(cart.id, productId, quantity);

    res.json({ message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart", error: err.message });
  }
};

/* ===============================
   UPDATE CART ITEM QUANTITY
================================ */
export const updateQuantity = async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;

    await updateCartQuantity(cartItemId, quantity);
    res.json({ message: "Quantity updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update quantity", error: err.message });
  }
};

/* ===============================
   REMOVE CART ITEM
================================ */
export const removeItem = async (req, res) => {
  try {
    await removeCartItem(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item", error: err.message });
  }
};

/* ===============================
   CLEAR CART
================================ */
export const clearCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    await clearCartItems(cart.id);
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear cart", error: err.message });
  }
};
