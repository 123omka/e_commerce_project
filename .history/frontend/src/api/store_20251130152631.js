import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/login/authSlice";
import signupReducer from "../features/signup/";
import profileReducer from "../features/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
    profile: profileReducer,
  },
});
