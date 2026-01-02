import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/products";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async ({ page = 1, limit = 8, search = "" }) => {
    const res = await axios.get(API, {
      params: { page, limit, search }
    });
    return res.data;
  }
);
export const addProduct = createAsyncThunk(
  "products/add",
  async (formData) => (await axios.post(`${API}/add`, formData)).data
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, formData }) => (await axios.put(`${API}/update/${id}`, formData)).data
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id) => {
    await axios.delete(`${API}/delete/${id}`);
    return id;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: { list: [],
   currentPage: 1,
    totalPages: 1,
    search
    total: 0,
    loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.products;
         state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
