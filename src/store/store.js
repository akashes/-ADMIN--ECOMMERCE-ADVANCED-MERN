// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import userReducer from '../features/user/userSlice.js';
import categoryReducer from '../features/category/categorySlice.js';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user:userReducer,
    category:categoryReducer
  },
});
