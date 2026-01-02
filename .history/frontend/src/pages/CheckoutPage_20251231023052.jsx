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
  {/* Order Summary */}
<div className="mb-10">
  <h3 className="text-3xl font-semibold mb-6 text-gray-800">
    Order Summary
  </h3>

  {/* Single Box */}
  <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
    
    {/* Header */}
    <div className="flex justify-between px-6 py-4 
                    border-b text-gray-600 font-semibold">
      <span>Product</span>
      <span>Subtotal</span>
    </div>

    {/* Product Rows */}
    <div className="divide-y">
      {items.map((i) => (
        <div
          key={i.id}
          className="flex justify-between items-center px-6 py-4 
                     hover:bg-gray-50 transition"
        >
          <span className="text-gray-800 font-medium">
            {i.name} × {i.quantity}
          </span>

          <span className="font-semibold text-green-600">
            ₹{i.price * i.quantity}
          </span>
        </div>
      ))}
    </div>

    {/* Total */}
    <div className="flex justify-between items-center px-6 py-5 
                    bg-gray-50 border-t rounded-b-2xl">
      <span className="text-xl font-semibold text-gray-800">
        Total
      </span>
      <span className="text-2xl font-bold text-green-700">
        ₹{total}
      </span>
    </div>
  </div>
</div>

);

}
