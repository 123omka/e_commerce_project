import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/login/authSliceauthSlice";
import signupReducer from "../features/signupSlice";
import profileReducer from "../features/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
    profile: profileReducer,
  },
});
