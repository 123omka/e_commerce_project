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
    dispatch(addToCart({ productId, quantity: 1 })).then(() =>
      dispatch(fetchCart())
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-extrabold text-center text-green-600 mb-12">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-[2000px] mx-auto justify-center">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col min-w-[360px]"
          >
            {/* Image Box */}
            <div className="w-full h-80 overflow-hidden rounded-t-2xl">
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt={p.name}
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Details Box */}
            <div className="px-5 py-4 flex flex-col flex-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {p.name}
              </h4>
              <p className="text-xl font-bold text-green-600 mb-2">
                ₹{p.price}
              </p>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {p.description}
              </p>
              <p className="text-sm text-gray-500 mb-4">In stock: {p.stock}</p>
              <button
                disabled={p.stock === 0}
                onClick={() => handleAddToCart(p.id)}
                className={`mt-auto w-full py-3 rounded-lg font-semibold text-white transition
                  ${
                    p.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                  }`}
              >
                {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
