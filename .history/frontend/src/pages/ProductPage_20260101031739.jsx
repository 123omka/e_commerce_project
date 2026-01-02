import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setPage } from "../features/products/productSlice";
import { addToCart, fetchCart } from "../features/cart/cartSlice";
import {ImageBox} from 
export default function ProductPage() {
  const dispatch = useDispatch();
  const { list: products, currentPage, totalPages, search, loading } =
    useSelector((state) => state.products);

  // fetch products whenever page or search changes
  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: 8, search }));
    dispatch(fetchCart());
  }, [currentPage, search, dispatch]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 })).then(() =>
      dispatch(fetchCart())
    );
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 mt-20">
      {/* PRODUCTS GRID */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : Array.isArray(products) && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full"
            >
              <div className="w-full aspect-3/4 overflow-hidden">
                <img
                  src={`http://localhost:5000/uploads/${p.image}`}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
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
                <p className="text-sm text-gray-500 mb-4">In stock: {p.stock}</p>
                <button
                  disabled={p.stock === 0}
                  onClick={() => handleAddToCart(p.id)}
                  className={`mt-auto w-full py-2.5 rounded-lg font-semibold text-white transition ${
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
      ) : (
        <p className="text-center mt-10">No products found</p>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            disabled={currentPage === 1}
            onClick={() => dispatch(setPage(currentPage - 1))}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => dispatch(setPage(i + 1))}
              className={`px-4 py-2 border rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => dispatch(setPage(currentPage + 1))}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
