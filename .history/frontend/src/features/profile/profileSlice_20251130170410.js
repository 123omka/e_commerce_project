import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from ".";

export const fetchProfile = createAsyncThunk("profile/fetch", async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("No token");

    const res = await api.get("/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.user;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState: { user: null, loading: false, error: null },
  reducers: {
    clearProfile: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
