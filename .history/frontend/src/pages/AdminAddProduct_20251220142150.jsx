// src/pages/AdminAddProduct.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../features/product/productSlice";

export default function AdminAddProduct() {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    description: "",
    stock: "",
    image: null,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setData({ ...data, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("stock", data.stock);
    formData.append("image", data.image);

    dispatch(createProduct(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md">
      <input name="name" placeholder="Name" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <input name="stock" type="number" placeholder="Stock" onChange={handleChange} />
      <input type="file" onChange={handleImage} />
      <button type="submit">Add Product</button>
    </form>
  );
}
