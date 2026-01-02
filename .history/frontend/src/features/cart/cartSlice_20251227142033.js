import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async () => (await axios.get("http://localhost:5000/api/cart")).data
);

export const addToCart = createAsyncThunk(
  "cart/add",
  async (data) => {
    await axios.post("http://localhost:5000/api/cart/add", data);
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/update",
  async (data) => {
    await axios.put("http://localhost:5000/api/cart/update", data);
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/remove",
  async (id) => {
    await axios.delete(`http://localhost:5000/api/cart/remove/${id}`);
  }
);

export const clearCart = createAsyncThunk(
  "cart/clear",
  async () => {
    await axios.delete("http://localhost:5000/api/cart/clear");
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

export default cartSlice.reducer;
