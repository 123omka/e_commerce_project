import { useDispatch, useSelector } from "react-redux";
import { placeOrder, resetOrder } from "../features/order/orderSlice";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { loading, success } = useSelector(state => state.order);

  const total = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const submitOrder = () => {
    dispatch(placeOrder({
      name: "Omkar",
      address: "Pune",
      phone: "9999999999",
      total,
      cartId: cart.cartId,
      items: cart.items
    }));
  };

  return (
    <div>
      <h2>Checkout</h2>

      <h3>Total: ₹{total}</h3>

      <button onClick={submitOrder} disabled={loading}>
        {loading ? "Placing Order..." : "Confirm Order"}
      </button>

      {success && (
        <p>
          Order placed successfully ✅
          <button onClick={() => dispatch(resetOrder())}>
            Place New Order
          </button>
        </p>
      )}
    </div>
  );
}
