import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/loginauthSlice";
import signupReducer from "../features/signupSlice";
import profileReducer from "../features/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
    profile: profileReducer,
  },
});
