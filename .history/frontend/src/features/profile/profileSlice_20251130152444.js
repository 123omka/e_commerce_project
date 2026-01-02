import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfile = createAsyncThunk(
  "profile/fetch",
  async (_, { getState }) => {
    const token = getState().auth.token;

    const res = await axios.get(
      "http://localhost:5000/api/auth/profile",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data.user;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
});

export default profileSlice.reducer;
