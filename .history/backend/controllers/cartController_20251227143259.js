import {
  getOrCreateCart,
  getCartItems,
  addItemToCart,
  updateCartQuantity,
  removeCartItem,
  clearCartItems
} from "../models/cartModel.js";

import { decreaseStock } from "../models/productModel.js";

export const fetchCart = (req, res) => {
  getOrCreateCart(req.user.id, (err, cart) => {
    getCartItems(cart.id, (err, items) => {
      res.json(items);
    });
  });
};

export const addToCart = (req, res) => {
  const { productId, quantity } = req.body;

  decreaseStock(productId, quantity, (err, result) => {
    if (result.affectedRows === 0)
      return res.status(400).json({ message: "Out of stock" });

    getOrCreateCart(req.user.id, (err, cart) => {
      addItemToCart(cart.id, productId, quantity, () => {
        res.json({ message: "Added to cart" });
      });
    });
  });
};

export const updateQuantity = (req, res) => {
  updateCartQuantity(req.body.cartItemId, req.body.quantity, () => {
    res.json({ message: "Quantity updated" });
  });
};

export const removeItem = (req, res) => {
  removeCartItem(req.params.id, () => {
    res.json({ message: "Item removed" });
  });
};

export const clearCart = (req, res) => {
  getOrCreateCart(req.user.id, (err, cart) => {
    clearCartItems(cart.id, () => {
      res.json({ message: "Cart cleared" });
    });
  });
};
