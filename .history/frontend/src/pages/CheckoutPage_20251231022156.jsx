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
  <div className="max-w-5xl mx-auto p-10 bg-white rounded-3xl shadow-2xl">
    {/* Title */}
    <h2 className="text-4xl font-extrabold mb-10 text-center text-green-600 tracking-wide">
      Checkout
    </h2>

    {/* Order Summary */}
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">
        Order Summary
      </h3>

      <div className="space-y-2">
        {items.map((i) => (
          <div
            key={i.id}
            className="flex justify-between items-center p-5 
                       bg-gray-50 rounded-2xl border border-gray-200
                       hover:bg-gray-100 hover:shadow-md
                       transition-all duration-200"
          >
            <span className="font-medium text-gray-700">
              {i.name} × {i.quantity}
            </span>

            <span className="font-semibold text-green-600 text-lg">
              ₹{i.price * i.quantity}
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-8 p-6 rounded-2xl 
                      bg-linear-to-r from-green-100 to-green-200
                      border border-green-300
                      flex justify-between items-center">
        <span className="text-xl font-semibold text-gray-800">
          Total
        </span>
        <span className="text-3xl font-extrabold text-green-700">
          ₹{total}
        </span>
      </div>
    </div>

    {/* Delivery Details */}
    <div className="mb-10 p-8 bg-gray-50 rounded-3xl border border-gray-200">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">
        Delivery Details
      </h3>

      <div className="space-y-5">
        <input
          className="w-full px-5 py-3 border border-gray-300 rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-green-400
                     placeholder-gray-400 text-gray-800"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full px-5 py-3 border border-gray-300 rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-green-400
                     placeholder-gray-400 text-gray-800"
          placeholder="Delivery Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          className="w-full px-5 py-3 border border-gray-300 rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-green-400
                     placeholder-gray-400 text-gray-800"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>
    </div>

    {/* Place Order Button */}
    <div className="text-center">
      <button
        onClick={handleOrder}
        className="w-full sm:w-96 px-8 py-4 
                   bg-green-600 text-white text-xl font-bold
                   rounded-full shadow-lg
                   hover:bg-green-700 hover:shadow-2xl
                   transition-all duration-200"
      >
        Place Order
      </button>
    </div>
  </div>
);

}
