import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../features/cart/cartSlice";
import { placeOrder } from "../features/order/orderSlice";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: ""
  });

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleOrder = async () => {
    dispatch(placeOrder(form));
    alert("Order placed successfully");
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-8 text-center text-green-600">
        Checkout
      </h2>

      {/* Order Summary */}
      <div className="mb-10">
        <h3 className="text-3xl font-semibold mb-4">Order Summary</h3>
        <div className="space-y-4">
          {items.map((i) => (
            <div
              key={i.id}
              className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <span className="font-medium text-gray-800">{i.name} × {i.quantity}</span>
              <span className="font-bold text-green-600 text-lg">₹{i.price * i.quantity}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 p-6 bg-gradient-to-r from-green-200 to-green-300 rounded-2xl shadow-lg flex justify-between items-center font-bold text-2xl">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg">
        <h3 className="text-3xl font-semibold mb-6">Delivery Details</h3>

        <input
          className="w-full mb-4 px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 text-gray-800"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full mb-4 px-5 py-3 h-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 text-gray-800"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          className="w-full mb-4 px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 text-gray-800"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      <div className="text-center">
        <button
          onClick={handleOrder}
          className="w-full sm:w-80 px-6 py-4 bg-green-600 text-white text-xl font-bold rounded-3xl hover:bg-green-700 transition-colors shadow-xl hover:shadow-2xl"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
