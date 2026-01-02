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
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Products</h2>

      <div className="flex flex-wrap gap-8">
        {products.map((p) => (
          <div
            key={p.id}
            className="
              w-[300px]
              rounded-xl
              border
              bg-white
              p-5
              shadow-sm
              transition-all
              duration-300
              hover:shadow-xl
              hover:-translate-y-1
            "
          >
            {/* Image Box */}
            <div className="w-full h-[220px] overflow-hidden rounded-lg mb-4">
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt={p.name}
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-300
                  hover:scale-110
                "
              />
            </div>

            {/* Product Info */}
            <h4 className="text-lg font-medium mb-1">{p.name}</h4>

            <p className="text-lg font-semibold text-gray-900">
              ₹{p.price}
            </p>

            <p className="text-sm text-gray-500 mb-3">
              Stock: {p.stock}
            </p>

            {/* Button */}
            <button
              disabled={p.stock === 0}
              onClick={() => handleAddToCart(p.id)}
              className={`
                w-full
                py-2
                rounded-lg
                font-medium
                transition-all
                duration-300
                ${
                  p.stock === 0
                    ? "bg-gray-300 cursor-not-allowed text-gray-600"
                    : "bg-black text-white hover:bg-gray-800 hover:scale-[1.02]"
                }
              `}
            >
              {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
