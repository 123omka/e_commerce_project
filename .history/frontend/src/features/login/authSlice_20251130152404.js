import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("auth/login", async (form) => {
  const res = await axios.post("http://localhost:5000/api/auth/login", form);
  return res.data.token;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = "Invalid Credentials";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
