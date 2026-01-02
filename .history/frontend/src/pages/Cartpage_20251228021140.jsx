import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const subtotal = (price, qty) => price * qty;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {items.length === 0 && (
        <p className="text-lg text-gray-500">Cart is empty</p>
      )}

      {items.map((item) => (
        <div
          key={item.id}
          className="flex gap-6 border-b border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:scale-105 mb-4"
        >
          <img
            src={`http://localhost:5000/uploads/${item.imageUrl}`}
            className="w-28 h-28 object-cover rounded"
          />

          <div className="flex-1">
            <h4 className="text-xl font-semibold">{item.name}</h4>
            <p className="text-gray-700">Price: ₹{item.price}</p>

            <div className="flex items-center gap-2 mt-2 mb-2">
              <button
                onClick={() =>
                  dispatch(
                    updateCartItem({
                      cartItemId: item.id,
                      quantity: item.quantity - 1
                    })
                  ).then(() => dispatch(fetchCart()))
                }
                disabled={item.quantity === 1}
                className="w-8 h-8 rounded border border-gray-300 bg-white font-bold disabled:cursor-not-allowed disabled:opacity-50"
              >
                -
              </button>

              <span className="text-lg font-medium w-6 text-center">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  dispatch(
                    updateCartItem({
                      cartItemId: item.id,
                      quantity: item.quantity + 1
                    })
                  ).then(() => dispatch(fetchCart()))
                }
                className="w-8 h-8 rounded border border-gray-300 bg-white font-bold"
              >
                +
              </button>
            </div>

            <p className="text-gray-600 font-medium">
              Subtotal: ₹{subtotal(item.price, item.quantity)}
            </p>

            <button
              onClick={() =>
                dispatch(removeCartItem(item.id))
                  .then(() => dispatch(fetchCart()))
              }
              className="mt-2 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-4">Total: ₹{total}</h3>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() =>
                dispatch(clearCart()).then(() => dispatch(fetchCart()))
              }
              className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
            >
              Clear Cart
            </button>

            <Link to="/checkout">
              <button className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition-colors">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
