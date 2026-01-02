import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/login/authSlice";
import signupReducer from "../features/signup/signupSlice";
import profileReducer from "../features/profile/profileSlice";
import productReducer from "../features/products/productSlice";
import  cart

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
    profile: profileReducer,
    products: productReducer,
    cart:createReducer,
  },
});
