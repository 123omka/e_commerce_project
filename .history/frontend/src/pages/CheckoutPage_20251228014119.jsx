import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../features/cart/cartSlice";
import { placeOrder } from "../features/order/orderSlice";
import axios from "axios";

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

  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const handleOrder = () => {
    dispatch(placeOrder( form ));
  };

    alert("Order placed successfully");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Checkout</h2>

      <h3>Order Summary</h3>

      {items.map((i) => (
        <p key={i.id}>
          {i.name} × {i.quantity} = ₹{i.price * i.quantity}
        </p>
      ))}

      <h3>Total: ₹{total}</h3>

      <hr />

      <h3>Delivery Details</h3>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <br /><br />

      <input
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <br /><br />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <br /><br />

      <button onClick={handleOrder}>
        Place Order
      </button>
    </div>
  );
}
