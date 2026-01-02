import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { addToCart, fetchCart } from "../features/cart/cartSlice";

export default function ProductPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 }))
      .then(() => dispatch(fetchCart()));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: 15,
              width: 220
            }}
          >
            <img
              src={`http://localhost:5000/uploads/${p.image}`}
              alt={p.name}
              style={{ width: "100%", height: 150, objectFit: "cover" }}
            />

            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <p>Stock: {p.stock}</p>

            <button
              disabled={p.stock === 0}
              onClick={() => handleAddToCart(p.id)}
              style={{ width: "100%" }}
            >
              {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
