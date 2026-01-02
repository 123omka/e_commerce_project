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
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      {/* Order Summary */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-3">Order Summary</h3>
        <div className="space-y-2">
          {items.map((i) => (
            <div
              key={i.id}
              className="flex justify-between p-3 border rounded shadow-sm hover:shadow-md transition"
            >
              <span className="font-medium">{i.name} × {i.quantity}</span>
              <span className="font-semibold">₹{i.price * i.quantity}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-gray-100 rounded-lg flex justify-between items-center font-bold text-xl">
          Total: ₹{total}
        </div>
      </div>

      <hr className="my-6" />

      {/* Delivery Details */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-3">Delivery Details</h3>

        <input
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      <button
        onClick={handleOrder}
        className="w-full sm:w-64 px-6 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition-colors"
      >
        Place Order
      </button>
    </div>
  );
}
