import {
  getOrCreateCart,
  getCartItems,
  clearCartItems
} from "../models/cartModel.js";

import {
  createOrder,
  insertOrderItems
} from "../models/orderModel.js";
import { decreaseStock } from "../models/productModel.js";



export const checkout = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const userId = req.user.id;

    // 1️⃣ Get or create cart
    const cart = await getOrCreateCart(userId);

    // 2️⃣ Get cart items
    const items = await getCartItems(cart.id);

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    for (const item of items) {
  const result = await decreaseStock(item.productId, item.quantity);

  if (result.affectedRows === 0) {
    return res.status(400).json({
      message: `${item.name} is out of stock`
    });
  }
}


    // 3️⃣ Calculate total
    let total = 0;

for (const item of items) {
  total += item.price * item.quantity;
}

 const user = await findUserById(req.user.id);
    // 4️⃣ Create order
    const orderResult = await createOrder({
      userId,
      total,
      name:user.name,
      address,
      phone
    });

    // 5️⃣ Insert order items
    await insertOrderItems(orderResult.insertId, items);

    // 6️⃣ Clear cart
    await clearCartItems(cart.id);

    res.json({ message: "Order placed successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
