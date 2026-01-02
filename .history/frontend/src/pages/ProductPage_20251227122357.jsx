import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { addToCart, fetchCart } from "../features/cart/cartSlice";

export default function ProductPage() {
  const dispatch = useDispatch();

  // ✅ FIX: correct state key
  const products = useSelector((state) => state.products.list);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = (id) => {
    dispatch(addToCart({ productId: id, quantity: 1 }));
    dispatch(fetchCart()); // ✅ simple & safe
    dispatch(fetchProducts()); // ✅ refresh stock live
  };

  return (
    <div>
      <h2>Products</h2>

      {products.map((p) => (
        <div
          key={p.id}
          style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
        >
          <h4>{p.name}</h4>
          <p>₹{p.price}</p>
          <p>Stock: {p.stock}</p>

          <button
            disabled={p.stock === 0}
            onClick={() => handleAdd(p.id)}
          >
            {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
}
