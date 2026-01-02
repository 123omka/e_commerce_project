import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/baseUrl";

// Fetch profile
export const fetchProfile = createAsyncThunk(
  "profile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/profile");
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk(
  "profile/update",
  async ({ name, mobile }, { rejectWithValue }) => {
    try {
      const res = await api.put("/auth/profile", { name, mobile });
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update profile");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: { user: null, loading: false, error: null, updateSuccess: false },
  reducers: {
    clearProfile: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.updateSuccess = false;
    },
    resetUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProfile
      .addCase(fetchProfile.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProfile.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(fetchProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      // updateProfile
      .addCase(updateProfile.pending, (state) => { state.loading = true; state.error = null; state.updateSuccess = false; })
      .addCase(updateProfile.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; state.updateSuccess = true; })
      .addCase(updateProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload; state.updateSuccess = false; });
  },
});

export const { clearProfile, resetUpdateSuccess } = profileSlice.actions;
export default profileSlice.reducer;
