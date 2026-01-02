import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";


export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity }) => {
    await api.post("/cart", { productId, quantity });
  }
);


export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const r = await api.get("/cart");
  return r.data;
});

export const updateQty = createAsyncThunk("cart/qty", async (d) => {
  await api.put(`/cart/${d.id}`, { quantity: d.quantity });
});

export const removeItem = createAsyncThunk("cart/remove", async (id) => {
  await api.delete(`/cart/${id}`);
});

export const clearCart = createAsyncThunk("cart/clear", async () => {
  await api.delete("/cart");
});

const slice = createSlice({
  name: "cart",
  initialState: { items: [], cartId: null },
  extraReducers: b => {
    b.addCase(fetchCart.fulfilled, (s, a) => {
      s.items = a.payload.items;
      s.cartId = a.payload.cartId;
    });
  }
});

export default slice.reducer;
