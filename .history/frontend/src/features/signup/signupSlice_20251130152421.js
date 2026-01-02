import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk("signup/register", async (form) => {
  const res = await axios.post("http://localhost:5000/api/auth/signup", form);
  return res.data;
});

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state) => {
        state.loading = false;
        state.error = "Signup failed";
      });
  }
});

export default signupSlice.reducer;
