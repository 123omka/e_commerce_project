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
  
  

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 mt-20  max-w-15xl">
      {products.map((p) => (
        <div
          key={p.id}
          className="bg-white  rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col w-[500px] gap-8"
        >
          {/* Image Box */}
          <div className="w-full h-80 overflow-hidden">
            <img
              src={`http://localhost:5000/uploads/${p.image}`}
              alt={p.name}
              className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Details Box */}
          <div className="px-4 py-3 flex flex-col flex-1">
            {/* Name */}
            <h4 className="text-lg font-semibold text-gray-900 mb-1">
              {p.name}
            </h4>

            {/* Price */}
            <p className="text-xl font-bold text-green-600 mb-2">
              ₹{p.price}
            </p>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">
              {p.description}
            </p>

            {/* Stock */}
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
      ))}
    </div>
  
);

};
