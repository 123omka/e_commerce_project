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
    <div className="max-w-[1600px] mx-auto px-6 mt-20">
      <div className="flex flex-wrap -mx-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-6 flex flex-col h-full"
          >
            {/* Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl 
                            transition-shadow duration-300 overflow-hidden flex flex-col h-full">
              
              {/* Image */}
              <div className="w-full aspect-3/4 overflow-hidden">
                <img
                  src={`http://localhost:5000/uploads/${p.image}`}
                  alt={p.name}
                  className="w-full h-full object-cover 
                             transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Details */}
              <div className="px-4 py-3 flex flex-col flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                  {p.name}
                </h4>

                <p className="text-xl font-bold text-green-600 mb-2">
                  ₹{p.price}
                </p>

                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {p.description}
                </p>

                <p className="text-sm text-gray-500 mb-4">
                  In stock: {p.stock}
                </p>

                {/* Button */}
                <button
                  disabled={p.stock === 0}
                  onClick={() => handleAddToCart(p.id)}
                  className={`mt-auto w-full py-2.5 rounded-lg font-semibold text-white transition
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
          </div>
        ))}
      </div>
    </div>
  );
}
