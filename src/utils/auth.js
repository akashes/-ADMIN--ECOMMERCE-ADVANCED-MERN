// utils/auth.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token); // get expiration timestamp (in seconds)
    
    return Date.now() >= exp * 1000;   // compare with current time in ms
  } catch (error) {
    return true; // if token is invalid or can't be decoded, treat it as expired
  }
};




export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/user/refresh-token`, // adjust path if needed
      {},
      {
        withCredentials: true, // very important to send refresh token cookie
      }
    );

    console.log('response in auth util',response.data)
    return response.data.data.accessToken; // new access token
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};
