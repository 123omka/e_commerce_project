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
  <div className="px-6 py-8">
    <h2 className="text-3xl font-bold mb-8 text-gray-800">
      Products
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((p) => (
        <div
          key={p.id}
          className="bg-white border rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
        >
          {/* Image */}
          <div className="w-full h-64 mb-4 overflow-hidden rounded-lg">
            <img
              src={`http://localhost:5000/uploads/${p.image}`}
              alt={p.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content */}
          <h4 className="text-lg font-semibold text-gray-900 mb-1">
            {p.name}
          </h4>

          <p className="text-xl font-bold text-green-600 mb-1">
            ₹{p.price}
          </p>

          <p className="text-sm text-gray-500 mb-4">
            Stock: {p.stock}
          </p>

          {/* Button */}
          <button
            disabled={p.stock === 0}
            onClick={() => handleAddToCart(p.id)}
            className={`w-full py-3 rounded-lg font-semibold text-white transition
              ${
                p.stock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95"
              }`}
          >
            {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  </div>
);
