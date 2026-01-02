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
    <div className="max-w-8xl mx-auto px-6 mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl 
                       transition-shadow duration-300 overflow-hidden 
                       flex flex-col h-full"
          >
            {/* BIG Image */}
            <div className="w-full aspect-[3/4] overflow-hidden">
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt={p.name}
                className="w-full h-full object-cover 
                           transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* BIG Content */}
            <div className="px-6 py-5 flex flex-col flex-1">
              <h4 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
                {p.name}
              </h4>

              <p className="text-2xl font-extrabold text-green-600 mb-3">
                ₹{p.price}
              </p>

              <p className="text-base text-gray-600 mb-4 line-clamp-3">
                {p.description}
              </p>

              <p className="text-sm text-gray-500 mb-6">
                In stock: {p.stock}
              </p>

              {/* BIG Button */}
              <button
                disabled={p.stock === 0}
                onClick={() => handleAddToCart(p.id)}
                className={`mt-auto w-full py-4 rounded-xl text-lg font-bold text-white transition
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
