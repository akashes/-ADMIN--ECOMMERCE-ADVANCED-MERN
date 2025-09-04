// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import userReducer from '../features/user/userSlice.js';
import categoryReducer from '../features/category/categorySlice.js';
import productReducer from '../features/product/productSlice.js';
import homeSlideReducer from '../features/homeSlide/homeSlide.js'
import bannerV1Reducer from '../features/bannerV1/bannerv1Slice.js'
import blogReducer from '../features/blog/blogSlice.js'
import orderReducer from '../features/order/orderSlice.js'
import dashboardReducer from '../features/dashboard/dashboardSlice.js'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user:userReducer,
    category:categoryReducer,
    product:productReducer,
    homeSlide:homeSlideReducer,
    bannerV1:bannerV1Reducer,
    blog:blogReducer,
    order:orderReducer,
    dashboard:dashboardReducer
  },
});
