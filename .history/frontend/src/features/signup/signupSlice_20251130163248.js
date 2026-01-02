import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {api} from "./"

export const signupUser = createAsyncThunk("signup/register", async (form, { rejectWithValue }) => {
  try {
    const res = await api.post("/signup", form);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Signup failed");
  }
});

const signupSlice = createSlice({
  name: "signup",
  initialState: { loading: false, success: false, error: null },
  reducers: {
    resetSignup: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
      });
  },
});

export const { resetSignup } = signupSlice.actions;
export default signupSlice.reducer;
