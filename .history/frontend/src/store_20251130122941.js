import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialAuth = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Signup failed');
      }
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchMe = createAsyncThunk(
  'auth/fetchMe',
  async (arg, { getState, rejectWithValue }) => {
    const token = getState().auth.token || localStorage.getItem('token');
    if (!token) return rejectWithValue('No token');
    try {
      const res = await fetch('http://localhost:5000/api/auth/me', {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (!res.ok) {
        throw new Error('Not authorized');
      }
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuth,
  reducers: {
    logout(state) {
      state.user = null; state.token = null; localStorage.removeItem('token');
      state.error = null; state.loading = false;
    },
    clearError(state) { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signupUser.fulfilled, (state) => { state.loading = false; state.error = null; })
      .addCase(signupUser.rejected, (state, { payload }) => { state.loading = false; state.error = payload; })
      // Login
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false; state.error = null;
        state.token = payload.token; localStorage.setItem('token', payload.token);
      })
      .addCase(loginUser.rejected, (state, { payload }) => { state.loading = false; state.error = payload; })
      // Fetch Me
      .addCase(fetchMe.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMe.fulfilled, (state, { payload }) => { state.loading = false; state.error = null; state.user = payload; })
      .addCase(fetchMe.rejected, (state, { payload }) => { state.loading = false; state.error = payload; state.user = null; });
  }
});

export const { logout, clearError } = authSlice.actions;

const store = configureStore({
  reducer: { auth: authSlice.reducer }
});

export default store;
