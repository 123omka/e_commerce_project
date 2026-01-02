import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/baseUrl";

export const placeOrder = createAsyncThunk(
  "order/place",
  async (orderData) => {
    const res = await api.post("/orders", orderData);
    return res.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    success: false,
    error: null
  },
  reducers: {
    resetOrder: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
