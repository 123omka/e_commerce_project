import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  api  from "../api/baseUrl";

export const loginUser = createAsyncThunk("auth/login", async (form, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/login", form);
    return res.data.token;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

const initialToken = localStorage.getItem("token") || null;

const authSlice = createSlice({
  name: "auth",
  initialState: { token: initialToken, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Invalid credentials";
      });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
