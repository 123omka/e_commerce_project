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
    <div style={{ padding: 20 }}>
      <h2>Your Cart</h2>

      {items.length === 0 && <p>Cart is empty</p>}

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: 15,
            borderBottom: "1px solid #ccc",
            paddingBottom: 10,
            marginBottom: 10
          }}
        >
          <img
            src={`http://localhost:5000/uploads/${item.image}`}
            width="100"
            height="100"
            style={{ objectFit: "cover" }}
          />

          <div style={{ flex: 1 }}>
            <h4>{item.name}</h4>
            <p>Price: ₹{item.price}</p>

            <div>
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
              >
                -
              </button>

              <span style={{ margin: "0 10px" }}>
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
              >
                +
              </button>
            </div>

            <p>Subtotal: ₹{subtotal(item.price, item.quantity)}</p>

            <button
              onClick={() =>
                dispatch(removeCartItem(item.id))
                  .then(() => dispatch(fetchCart()))
              }
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <>
          <h3>Total: ₹{total}</h3>

          <button
            onClick={() =>
              dispatch(clearCart())
                .then(() => dispatch(fetchCart()))
            }
          >
            Clear Cart
          </button>

          <br /><br />

          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
}
