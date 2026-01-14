import axios from 'axios';
import { store } from '../store/store';
import { forceLogout } from '../features/auth/authSlice';


//req interceptor
axios.interceptors.request.use(
    (config) => {
        // Get token from Local Storage
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


// response interceotor
axios.interceptors.response.use(
  (response) => {
    // If the request succeeds, just pass it through
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401  AND we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // Mark retry to prevent infinite loops
      originalRequest._retry = true;

      try {
       
        const refreshResponse = await axios.post('/api/user/refresh-token', {}, {
             withCredentials: true 
        });

        const newAccessToken = refreshResponse.data.accessToken; 

        localStorage.setItem('admin_accessToken', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

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