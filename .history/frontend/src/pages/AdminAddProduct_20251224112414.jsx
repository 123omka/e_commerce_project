import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../features/product/productSlice";

export default function AdminAddProduct() {
  const dispatch = useDispatch();

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
    formData.append("imageU", data.image);

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

      <input
      name="imageUrl"
        type="file"
        accept="image/*"
        onChange={handleImage}
        required
      />

      <button type="submit">Add Product</button>
    </form>
  );
}
