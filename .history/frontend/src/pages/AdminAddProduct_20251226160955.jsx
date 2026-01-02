import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../features/products/productSlice";

const AdminA = () => {
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
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {editId ? "Update Product" : "Add Product"}
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="file"
            onChange={handleImageChange}
            className="border rounded-lg px-3 py-2 bg-gray-50"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border rounded-lg px-4 py-2 col-span-1 md:col-span-2 focus:ring-2 focus:ring-blue-400"
          />

          {preview && (
            <img
              src={preview}
              className="w-28 h-28 object-cover rounded-lg border"
            />
          )}

          <div className="col-span-1 md:col-span-2 flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {editId ? "Update" : "Add"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* LIST */}
        <h2 className="text-xl font-semibold mb-4">Products</h2>

        {loading && <p className="text-gray-500">Loading...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map((p) => (
            <div
              key={p.id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />

              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-gray-600 text-sm mb-1">{p.description}</p>
              <p className="text-sm font-medium">
                ₹{p.price} · Stock: {p.stock}
              </p>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleEdit(p)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCRUD;
