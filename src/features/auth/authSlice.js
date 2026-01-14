import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/user/register', formData);
      if (!res.data.success) throw new Error(res.data.message || 'Registration failed');
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Registration failed');
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/user/login', { email, password });
      
      if (!res.data.success) {
        throw new Error(res.data.message || 'Login failed');
      }

      const { admin_accessToken, user } = res.data.data;

      // Save to LocalStorage
      localStorage.setItem('admin_accessToken', admin_accessToken);
      localStorage.setItem('admin_user', JSON.stringify(user));

      return { token: admin_accessToken, user };
    } catch (err) {
      return rejectWithValue({
        status: err.response?.status || 500,
        message: err.response?.data?.message || err.message || 'Login failed',
        error: err.response?.data?.error || null
      });
    }
  }
);

export const tryAutoLogin = createAsyncThunk(
  'auth/tryAutoLogin',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('admin_accessToken');
    
    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      // If this returns 401, the interceptor will refresh the token and retry this request.
      const res = await axios.get('/api/user/user-details');
      
      if (!res.data.success) throw new Error('User fetch failed');

      return { user: res.data.data, token };
    } catch (err) {
      // If we reach here, it means the token is invalid and also  refresh failed.
      localStorage.removeItem('admin_accessToken');
      localStorage.removeItem('admin_user');
      return rejectWithValue('Session expired');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/api/user/logout');
    } catch (err) {
      console.error('Logout API failed', err);
    } finally {
      // Always clear local state regardless of server response
      localStorage.removeItem('admin_accessToken');
      localStorage.removeItem('admin_user');
      return 'Logged out successfully';
    }
  }
);



export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/user/verify-email', { email, otp });
      if (!res.data.success) throw new Error(res.data.message || 'Verification failed');
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Verification failed');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/user/forgot-password', { email });
      if (!res.data.success) throw new Error(res.data.message || 'Password reset failed');
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Password reset failed');
    }
  }
);

export const forgotPasswordOtp = createAsyncThunk(
  'auth/forgotPasswordOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/user/verify-forgot-password-otp', { email, otp });
      if (!res.data.success) throw new Error(res.data.message || 'Password reset failed');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Password reset failed');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ newPassword, confirmPassword }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const resetToken = state.auth.resetPasswordToken;
      if (!resetToken) throw new Error('Reset token not found');

      const res = await axios.put('/api/user/reset-password', { newPassword, confirmPassword, resetToken });
      if (!res.data.success) throw new Error(res.data.message || 'Password reset failed');
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Password reset failed');
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  'auth/uploadAvatar',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.put('/api/user/upload-avatar', formData);
      if (!res.data.success) throw new Error(res.data.message || 'Avatar upload failed');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Avatar upload failed');
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  'auth/updateUserDetails',
  async ({ name, mobile }, { rejectWithValue }) => {
    try {
      const res = await axios.put('/api/user/update-user-details', { name, mobile });
      if (!res.data.success) throw new Error(res.data.message || 'User details update failed');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'User details update failed');
    }
  }
);

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async ({ oldPassword, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.put('/api/user/update-password', { oldPassword, newPassword, confirmPassword });
      if (!res.data.success) throw new Error(res.data.message || 'Password update failed');
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Password update failed');
    }
  }
);



const initialState = {
  isLogin: false,
  user: null,
  token: null,
  loading: false,
  error: null,
  resetPasswordToken: null,
  authChecked: false, 
  userLoading: false,
  userError: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      setGoogleAuthCredentials(state, action) {
      state.isLogin = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.authChecked = true;
      state.loading = false;
    },
    setResetPasswordToken(state, action) {
      state.resetPasswordToken = action.payload;
    },
    // Useful if you need to manually logout from a component or interceptor
    forceLogout(state) {
      state.isLogin = false;
      state.user = null;
      state.token = null;
      state.authChecked = true;
      localStorage.removeItem('admin_accessToken');
      localStorage.removeItem('admin_user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.authChecked = true; 
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(tryAutoLogin.pending, (state) => {
        state.loading = true;
        state.authChecked = false;
      })
      .addCase(tryAutoLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.authChecked = true;
      })
      .addCase(tryAutoLogin.rejected, (state) => {
        state.loading = false;
        state.isLogin = false;
        state.user = null;
        state.token = null;
        state.authChecked = true;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.isLogin = false;
        state.user = null;
        state.token = null;
      })

      .addCase(forgotPassword.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(forgotPassword.fulfilled, (state) => { state.loading = false; })
      .addCase(forgotPassword.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(forgotPasswordOtp.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(forgotPasswordOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.resetPasswordToken = action.payload.resetToken;
      })
      .addCase(forgotPasswordOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(resetPassword.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(resetPassword.fulfilled, (state) => { state.loading = false; state.resetPasswordToken = null; })
      .addCase(resetPassword.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(uploadAvatar.pending, (state) => { state.userLoading = true; state.userError = null; })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.userLoading = false;
        if (state.user) state.user.avatar = action.payload.avatar;
      })
      .addCase(uploadAvatar.rejected, (state, action) => { state.userLoading = false; state.userError = action.payload; })

      .addCase(updateUserDetails.pending, (state) => { state.userLoading = true; state.userError = null; })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.userLoading = false;
        if (state.user) {
          state.user.name = action.payload.name;
          state.user.mobile = action.payload.mobile;
        }
      })
      .addCase(updateUserDetails.rejected, (state, action) => { state.userLoading = false; state.userError = action.payload; })

      .addCase(updatePassword.pending, (state) => { state.userLoading = true; state.userError = null; })
      .addCase(updatePassword.fulfilled, (state) => { state.userLoading = false; })
      .addCase(updatePassword.rejected, (state, action) => { state.userLoading = false; state.userError = action.payload; });
  }
});

export const { setResetPasswordToken, forceLogout,setGoogleAuthCredentials } = authSlice.actions;
export default authSlice.reducer;