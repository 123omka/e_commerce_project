import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../features/products/productSlice";

const ProductCRUD = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.products);

  const [form, setForm] = useState({ name: "", price: "", description: "", stock: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };
  const handleImageChange = (e) => { const file = e.target.files[0]; setImage(file); setPreview(URL.createObjectURL(file)); };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(k => formData.append(k, form[k]));
    if (image) formData.append("image", image);

    if (editId) dispatch(updateProduct({ id: editId, formData }));
    else dispatch(addProduct(formData));

    resetForm();
  };

  const handleEdit = (p) => {
    setEditId(p.id);
    setForm({ name: p.name, price: p.price, description: p.description, stock: p.stock });
    setPreview(`http://localhost:5000/uploads/${p.image}`);
  };

  const handleDelete = (id) => { if (window.confirm("Delete this product?")) dispatch(deleteProduct(id)); };
  const resetForm = () => { setForm({ name: "", price: "", description: "", stock: "" }); setImage(null); setPreview(null); setEditId(null); };

  return (
    <div style={{ maxWidth: 900, margin: "auto" }}>
      <h2>{editId ? "Update Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <input name="name" value={form.name} placeholder="Name" onChange={handleChange} required />
        <input name="price" value={form.price} placeholder="Price" onChange={handleChange} required />
        <input name="stock" value={form.stock} placeholder="Stock" onChange={handleChange} required />
        <textarea name="description" value={form.description} placeholder="Description" onChange={handleChange} />
        <input type="file" onChange={handleImageChange} />
        {preview && <img src={preview} width="120" style={{ display: "block", marginTop: 10 }} />}
        <div style={{ marginTop: 10 }}>
          <button type="submit">{editId ? "Update" : "Add"}</button>
          {editId && <button type="button" onClick={resetForm}>Cancel</button>}
        </div>
      </form>

      <h2>Products</h2>
      {loading && <p>Loading...</p>}
      {list.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
          <img src={`http://localhost:5000/uploads/${p.image}`} width="80" />
          <h4>{p.name}</h4>
          <p>{p.description}</p>
          <p>₹{p.price} | Stock: {p.stock}</p>
          <button onClick={() => handleEdit(p)}>Edit</button>
          <button onClick={() => handleDelete(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default A;
