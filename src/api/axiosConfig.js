// import axios from 'axios';
// import { store } from '../store/store';
// import { forceLogout } from '../features/auth/authSlice';


// //req interceptor
// axios.interceptors.request.use(
//     (config) => {
//         // Get token from Local Storage
//     const token = localStorage.getItem('admin_accessToken');
    
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


// // response interceotor
// axios.interceptors.response.use(
//   (response) => {
//     // If the request succeeds, just pass it through
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if error is 401  AND we haven't tried refreshing yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
      
//       // Mark retry to prevent infinite loops
//       originalRequest._retry = true;

//       try {
       
//         const refreshResponse = await axios.post('/api/user/refresh-token', {}, {
//              withCredentials: true 
//         });

//         const newAccessToken = refreshResponse.data.accessToken; 

//         localStorage.setItem('admin_accessToken', newAccessToken);

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//         return axios(originalRequest);

//       } catch (refreshError) {
//         console.error("Session expired:", refreshError);
        
//         store.dispatch(forceLogout()); 
        
//         window.location.href = '/login'; 
        
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );


import axios from 'axios';
import { store } from '../store/store';
import { forceLogout } from '../features/auth/authSlice';

// 1. Create a dedicated instance (Optional but recommended to avoid global pollution)
// const api = axios.create({ baseURL: 'YOUR_API_URL' }); 
// If sticking with global axios, proceed below:

// --- Request Interceptor ---
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Response Interceptor ---
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // START FIX: Prevent infinite loops
    // If the error comes from the refresh-token endpoint itself, reject immediately.
    // Do not try to refresh the refresh token.
    if (originalRequest.url.includes('/api/user/refresh-token')) {
        // Optional: Trigger logout here if refresh fails
        store.dispatch(forceLogout());
        window.location.href = '/login';
        return Promise.reject(error);
    }
    // END FIX

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Ideally, create a new axios instance for the refresh call 
        // to ensure no other interceptors interfere.
        const refreshResponse = await axios.post('/api/user/refresh-token', {}, {
             withCredentials: true 
        });

        const newAccessToken = refreshResponse.data.accessToken; 

        localStorage.setItem('admin_accessToken', newAccessToken);

        // Update the header on the FAILED request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request
        return axios(originalRequest);

      } catch (refreshError) {
        console.error("Session expired:", refreshError);
        
        store.dispatch(forceLogout()); 
        window.location.href = '/login'; 
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);