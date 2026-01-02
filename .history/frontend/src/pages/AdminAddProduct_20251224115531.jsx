import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../features/product/productSlice";

export default function AdminAddProduct() {
  const dispatch = useDispatch();
 const [imageUrl, setIImageUrl] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",        // ✅ added
    stock: "",
    imageUrl: null,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setData({ ...data, imageUrl: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);   // ✅ added
    formData.append("stock", data.stock);
    formData.append("imageUrl", imageUrl);

    dispatch(createProduct(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md space-y-3">
      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        required
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        onChange={handleChange}
        required
      />

      <input
        name="stock"
        type="number"
        placeholder="Stock"
        onChange={handleChange}
        required
      />

      <div>
              <label className="block font-[open_Sans] font-medium text-gray-700 mb-1">
                Upload ID Proof
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setIdProof(e.target.files[0])}
                id="idProof"
                className="w-full border border-[#040404] bg-[#f1f1f1] rounded-full px-3 py-2 font-[open_Sans] file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              />

      <button type="submit">Add Product</button>
    </form>
  );
}
