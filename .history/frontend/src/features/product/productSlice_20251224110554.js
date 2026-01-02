// src/features/product/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createProduct = createAsyncThunk(
  "product/create",
  async (formData) => {
    const res = await axios.post(
      "http://localhost:5000/api/products/create",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return res.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
