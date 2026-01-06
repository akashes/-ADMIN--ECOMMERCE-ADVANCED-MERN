// store/index.js
import { configureStore,combineReducers } from '@reduxjs/toolkit';
import { persistStore,persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import authReducer from '../features/auth/authSlice.js';
import userReducer from '../features/user/userSlice.js';
import categoryReducer from '../features/category/categorySlice.js';
import productReducer from '../features/product/productSlice.js';
import homeSlideReducer from '../features/homeSlide/homeSlide.js'
import bannerV1Reducer from '../features/bannerV1/bannerv1Slice.js'
import blogReducer from '../features/blog/blogSlice.js'
import orderReducer from '../features/order/orderSlice.js'
import dashboardReducer from '../features/dashboard/dashboardSlice.js'
// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     user:userReducer,
//     category:categoryReducer,
//     product:productReducer,
//     homeSlide:homeSlideReducer,
//     bannerV1:bannerV1Reducer,
//     blog:blogReducer,
//     order:orderReducer,
//     dashboard:dashboardReducer
//   },
// });

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  homeSlide: homeSlideReducer,
  bannerV1: bannerV1Reducer,
  blog: blogReducer,
  order: orderReducer,
  dashboard: dashboardReducer
});

// Setup Persist Configuration
const persistConfig = {
  key: 'root',
  storage,
  // Whitelist: Only these slices will be saved to localStorage
  // We include 'dashboard' for the notifications and 'auth' for login session
  whitelist: ['dashboard', 'auth'] 
};

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for Redux Persist to work without console errors
    }),
});

// 5. Create and export the persistor
export const persistor = persistStore(store);