import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../features/products/productSlice";

const AdminAddProduct = () => {
  const dispatch = useDispatch();
  const { list = [], loading } = useSelector((s) => s.products || {});

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((k) => formData.append(k, form[k]));
    if (image) formData.append("image", image);

    editId
      ? dispatch(updateProduct({ id: editId, formData }))
      : dispatch(addProduct(formData));

    resetForm();
  };

  const handleEdit = (p) => {
    setEditId(p.id);
    setForm({
      name: p.name,
      price: p.price,
      description: p.description,
      stock: p.stock,
    });
    setPreview(`http://localhost:5000/uploads/${p.image}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const resetForm = () => {
    setForm({ name: "", price: "", description: "", stock: "" });
    setImage(null);
    setPreview(null);
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg--to-br from-gray-100 to-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* PAGE TITLE */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Product Management
          </h1>
          <p className="text-gray-500 text-sm">
            Add, update or manage your store products
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            {editId ? "Update Product" : "Add New Product"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              type="file"
              onChange={handleImageChange}
              className="border rounded-xl px-3 py-3 bg-gray-50"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Product Description"
              rows="4"
              className="border rounded-xl px-4 py-3 col-span-1 md:col-span-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {preview && (
              <div className="col-span-1 md:col-span-2">
                <img
                  src={preview}
                  className="w-32 h-32 object-cover rounded-xl border shadow-sm"
                />
              </div>
            )}

            <div className="col-span-1 md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
              >
                {editId ? "Update Product" : "Add Product"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 px-8 py-3 rounded-xl hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* PRODUCT LIST */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Product List
          </h2>

          {loading && <p className="text-gray-500">Loading products...</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={`http://localhost:5000/uploads/${p.image}`}
                  className="w-full h-44 object-cover"
                />

                <div className="p-8">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold text-gray-800">
                      {p.name}
                    </h3>
                    <span className="text-sm font-semibold text-blue-600">
                      ₹{p.price}
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-2">
                    {p.description}
                  </p>

                  <p className="text-xs text-gray-600 mb-4">
                    Stock: {p.stock}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(p)}
                      className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminAddProduct;
