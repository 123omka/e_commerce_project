import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";

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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Your Cart</h2>
        {items.length > 0 && (
          <button
            onClick={() =>
              dispatch(clearCart()).then(() => dispatch(fetchCart()))
            }
            className="px-4 py-2 rounded bg-gray-200 hover:bg--600 transition-colors"
          >
            <TrashIcon className="w-5 h-5" />
            
          </button>
        )}
      </div>

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
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-semibold">{item.name}</h4>
              <button
                onClick={() =>
                  dispatch(removeCartItem(item.id)).then(() =>
                    dispatch(fetchCart())
                  )
                }
                className="px-2 py-1 rounded bg-gray-200  hover:bg-gray-400 transition-colors text-sm"
              >
               ✕
              </button>
            </div>

            <p className="text-gray-700 mt-1">Price: ₹{item.price}</p>

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
          </div>
        </div>
      ))}

      {/* Total + Checkout Box */}
      {items.length > 0 && (
        <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold">
            Total: ₹{total}
          </div>
          <Link to="/checkout" className="w-full sm:w-auto">
            <button className="w-full sm:w-64 px-6 py-3 rounded bg-green-500 text-white text-lg font-semibold hover:bg-green-600 transition-colors">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
