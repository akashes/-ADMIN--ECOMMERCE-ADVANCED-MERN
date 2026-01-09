// store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isTokenExpired, refreshAccessToken } from '../../utils/auth';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

let refreshTimer = null;



export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/user/register', formData);

      if (!res.data.success) {
        throw new Error(res.data.message || 'Registration failed');
      }

      return res.data.message; // Only success message
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Registration failed'
      );
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async ({ email,otp }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/user/verify-email', { email,otp });
      console.log(res)
      if (!res.data.success) {
        throw new Error(res.data.message || 'Verification failed');
      }
      return res.data.message; // Only success message
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Verification failed'
      );
    }
  }
);

export const userLogin=createAsyncThunk(
  'auth/userLogin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/user/login', { email, password });
      console.log(res)
      if (!res.data.success) {
        return rejectWithValue({
          status:res.data.status,
          message:res.data.message || 'Login failed',
          error:res.data.error
        })

      }
      return res.data.data
    } catch (err) {
      return rejectWithValue({
        status:err.response?.status || 500,
        message:err.response?.data?.message || err.message || 'Login failed',
        error:err.response?.data?.error || null
      }
      );
    }
  }
);
export const forgotPassword=createAsyncThunk(
  'auth/forgotPassword',
  async (email,{rejectWithValue})=>{
    try {
      const res=await axios.post('/api/user/forgot-password',{email})
      if(!res.data.success){
        throw new Error(res.data.message || 'Password reset failed')
      }
      return res.data.message
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Password reset failed')
    }
  }
)
export const forgotPasswordOtp=createAsyncThunk(
  'auth/forgotPasswordOtp',
  async ({email,otp},{rejectWithValue})=>{
    try {
      const res=await axios.post('/api/user/verify-forgot-password-otp',{email,otp})
      console.log(res)
      if(!res.data.success){
        throw new Error(res.data.message || 'Password reset failed')
      }
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Password reset failed')
    }
  }
)
export const tryAutoLogin = createAsyncThunk(
  'auth/tryAutoLogin',
  async (_, { dispatch, rejectWithValue }) => {
    let token = localStorage.getItem('admin_accessToken');
    console.log('token in localstorage for auto login',token)

    if (!token || isTokenExpired(token)) {
      console.log('token not found or expired');
      
      try {
        console.log('calling refres-token endpoint')
        const res = await refreshAccessToken();
        console.log(res)
        const newToken = res
        console.log('got new acess token',newToken)
        if (!newToken) throw new Error('Token refresh failed');
        localStorage.setItem('admin_accessToken', newToken);
        token = newToken;
      } catch (err) {
        return rejectWithValue('Token refresh failed');
      }
    }

    try {
      console.log('second try')
      console.log('token not expired or available')
      console.log('calling user-detaiils endpoint')

      const res = await axios.get('/api/user/user-details');
      console.log('response from user details',res)
      console.log(res.data.data)
      if (!res.data.success) throw new Error('User fetch failed');
      dispatch(scheduleTokenRefresh(token));
      return { user: res.data.data, token };
    } catch (err) {
      return rejectWithValue('Failed to fetch user');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ token, user }, { dispatch }) => {
    localStorage.setItem('admin_accessToken', token);
    localStorage.setItem('admin_user', JSON.stringify(user));
    dispatch(scheduleTokenRefresh(token));
    return { token, user };
  }
);



export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log('inside logout user')
      //call backend api 
    const res =   await axios.post('/api/user/logout',{},{
        withCredentials:true
      })
      console.log(res)
      //clear frontend auth data
       localStorage.removeItem('admin_accessToken');
    localStorage.removeItem('admin_user');
    if (refreshTimer) clearTimeout(refreshTimer);
    if(res.data.success){
      return res.data.message

    }
    } catch (err) {
       return rejectWithValue(
        err.response?.data?.message || err.message || 'Logout failed'
      );
      
    }
   
  }
);

export const scheduleTokenRefresh = createAsyncThunk(
  'auth/scheduleRefresh',
  async (token, { dispatch }) => {
    if (refreshTimer) clearTimeout(refreshTimer);
    const { exp } = jwtDecode(token);
    const refreshTime = exp * 1000 - Date.now() - 30 * 1000;

    refreshTimer = setTimeout(async () => {
      console.log('hitting refresh token inside scheduleRefresh thunk')
      const newToken = await refreshAccessToken();
      console.log(newToken)
      if (newToken) {
        localStorage.setItem('admin_accessToken', newToken);
        dispatch(scheduleTokenRefresh(newToken));
      } else {
        dispatch(logoutUser());
    //         localStorage.removeItem('admin_accessToken');
    // localStorage.removeItem('user');
    // if (refreshTimer) clearTimeout(refreshTimer);
      }
    }, refreshTime);
  }
);

export const resetPassword=createAsyncThunk(
  'auth/resetPassword',
  async ({newPassword,confirmPassword},{rejectWithValue,getState})=>{
    try {
      const state = getState()
      const resetToken=state.auth.resetPasswordToken
      if(!resetToken){
        throw new Error('Reset token not found')
      }
      const res=await axios.put('/api/user/reset-password',{newPassword,confirmPassword,resetToken})
      if(!res.data.success){
        throw new Error(res.data.message || 'Password reset failed')
      }
      return res.data.message
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Password reset failed')
    }
  }
)


export const uploadAvatar=createAsyncThunk(
  'auth/uploadAvatar',
  async (formData,{rejectWithValue})=>{
    try {
      const res=await axios.put('/api/user/upload-avatar',formData)
      console.log(res)
      if(!res.data.success){
        throw new Error(res.data.message || 'Avatar upload failed')
      }
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Avatar upload failed')
    }
  })

  export const updateUserDetails=createAsyncThunk('auth/updateUserDetails',async ({name,mobile},{rejectWithValue})=>{
    try {
      const res=await axios.put('/api/user/update-user-details',{name,mobile})
      if(!res.data.success){
        throw new Error(res.data.message || 'User details update failed')
      }
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'User details update failed')
    }
  })
  export const updatePassword = createAsyncThunk(
    'auth/updatePassword',
    async ({ oldPassword, newPassword, confirmPassword }, { rejectWithValue }) => {
      try {
        const res = await axios.put('/api/user/update-password', { oldPassword, newPassword, confirmPassword });
        if (!res.data.success) {
          throw new Error(res.data.message || 'Password update failed');
        }
        return res.data.message;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message || 'Password update failed');
      }
    }
  )
const initialState = {
  isLogin: false,
  user: null,
  token: null,
  loading: false,
  error: null,
  resetPasswordToken: null,
  authChecked:false,
  userLoading:false,
  userError:null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setResetPasswordToken(state, action) {
      state.resetPasswordToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
            .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // User is not logged in yet; waiting for OTP verification
        })
        .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
        })
        .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // User is not logged in yet; waiting for OTP verification
        })
        .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Verification failed';
        })
        .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isLogin = true;
        state.token =action.payload.admin_accessToken
        state.user = action.payload.user;
        })
        .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
        })
        .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        })
        .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Password reset failed';
        })
        .addCase(forgotPasswordOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(forgotPasswordOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log(action.payload)
        state.resetPasswordToken = action.payload.resetToken;
        })
        .addCase(forgotPasswordOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Password reset failed';
        })

      .addCase(tryAutoLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(tryAutoLogin.fulfilled, (state, action) => {
        state.isLogin = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        state.authChecked=true
      })
      .addCase(tryAutoLogin.rejected, (state) => {
        // state.isLogin = false;
        // state.user = null;
        // state.token = null;
        // state.loading = false;
        state.authChecked=true
        state.loading=false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLogin = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
            state.loading = false;
        state.error = null;

   
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLogin = false;
        state.user = null;
        state.token = null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.resetPasswordToken = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Password reset failed';
      })

      .addCase(uploadAvatar.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userError = null;
        state.user.avatar = action.payload.avatar;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload || 'Avatar upload failed';
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userError = null;
        state.user.name = action.payload.name;
        state.user.mobile = action.payload.mobile;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload || 'User details update failed';
      })
      .addCase(updatePassword.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userError = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload || 'Password update failed';
      })
  }
});

export const { setResetPasswordToken } = authSlice.actions;
export default authSlice.reducer;
