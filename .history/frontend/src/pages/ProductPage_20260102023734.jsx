import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setPage } from "../features/products/productSlice";
import { addToCart, fetchCart } from "../features/cart/cartSlice";

export default function ProductPage() {
  const dispatch = useDispatch();
  const { list: products, currentPage, totalPages, search, loading } =
    useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: 12, search }));
    dispatch(fetchCart());
  }, [currentPage, search, dispatch]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 })).then(() =>
      dispatch(fetchCart())
    );
  };

  return (
    <>
     {/* 🔥 TOP IMAGE (50% SCREEN) */}
      <div className="relative h-[60vh] w-full bg-[url('/bg.pn')] bg-contain bg-center ">
        {/* overlay */}
        <div className="absolute inset-0 bg-black/0"></div>
      </div>

      {/* 🎨 REMAINING PAGE BACKGROUND COLOR */}
      <section className="bg-gray-200 ">
        {/* PRODUCTS (OVERLAP IMAGE) */}
        <div className="-mt-40 relative z-10 max-w-[1600px] mx-auto px-6 pb-20">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : products?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className=" rounded-xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
                >
                  <div className="w-full aspect-3/4 overflow-hidden">
                    <img
                      src={`http://localhost:5000/uploads/${p.image}`}
                      alt={p.name}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </div>

                  <div className="px-4 py-3 flex flex-col flex-1">
                    <h4 className="text-lg font-semibold line-clamp-2">
                      {p.name}
                    </h4>

                    <p className="text-xl font-bold text-green-600">
                      ₹{p.price}
                    </p>

                    <p className="text-sm text-gray-600 line-clamp-3">
                      {p.description}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      In stock: {p.stock}
                    </p>

                    <button
                      disabled={p.stock === 0}
                      onClick={() => handleAddToCart(p.id)}
                      className={`mt-auto w-full py-2.5 rounded-lg text-white ${
                        p.stock === 0
                          ? "bg-gray-400"
                          : "bg-blue-600 hover:bg-blue-700"
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
            <div className="flex justify-center gap-2 mt-10">
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
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white"
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
      </section>
    </>
  );
}
