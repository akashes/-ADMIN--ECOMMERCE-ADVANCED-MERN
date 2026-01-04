import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const addAddress = createAsyncThunk('user/addAddress',async(address,{rejectWithValue})=>{
    try {
        const result = await axios.post('/api/address/add-address',address)
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Address add failed')
        }
        return result.data

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Address add failed')
        
    }
})

export const getAllUsers = createAsyncThunk('user/getAllUsers',async({page=1,perPage=3,search=''},{rejectWithValue})=>{
    console.log(page,perPage)
    try {
        const result = await axios.get(`/api/user/get-all-users?page=${page}&perPage=${perPage}&search=${search}`)
        console.log(result)
        if(!result.data.success){
            throw new Error(result.data.message || 'Failed to get Users')
        }
        return result.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to get Users')
        
    }
})
export const getAddress = createAsyncThunk('user/getAddress',async(userId,{rejectWithValue})=>{
    try {
        console.log('insdie get addres')
        const result = await axios.get(`/api/address/get-address?userId=${userId}`)
        console.log(result)
        if(!result.data.success){
            throw new Error(result.data.message || 'Address get failed')
        }
        return result.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Address get failed')
        
    }
})

// export const selectAddress = createAsyncThunk('user/selectAddress',async({addressId,selected},{rejectWithValue})=>{
//     try {
//         const result = await axios.put(`/api/address/select-address/${addressId}`,{selected})
//         console.log(result)
//         if(!result.data.success){
//             throw new Error(result.data.message || 'Address select failed')
//         }
//         return result.data
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.message || error.message || 'Address select failed')
        
//     }
// })


export const deleteUser= createAsyncThunk('product/deleteUser',async(userId,{rejectWithValue})=>{
    try {
        const result = await axios.delete(`/api/user/delete-user/${userId}`)
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to delete User')
        }
        return result.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to delete User')
        
    }
})


export const deleteMultipleUsers=createAsyncThunk('product/deleteMultipleUsers',async(ids,{rejectWithValue})=>{
    try {
        console.log(ids)
        const result = await axios.delete('/api/user/delete-multiple-users',{data:{ids}})
          console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to get product')
        }
        return result.data

        
        
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to delete Users')

        
    }
})

export const updateUserRoles = createAsyncThunk(
  "user/updateUserRoles",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/user/roles/${userId}`, { role });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error updating roles");
    }
  }
);
export const updateUserStatus = createAsyncThunk(
  "user/updateUserStatus",
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/user/status/${userId}`, { status });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error updating status");
    }
  }
);


const userSlice = createSlice({
    name:'user',
    initialState:{
        address:[],
        loading:false,
        error:null,
        categoryImages:[],
        users:[],
        allUsersLoading:false,
        allUsersError:null,
        pagination:{
            page:1,
            totalPages:1,
            perPage:10,
            totalUsers:0
        },
        updateLoading:false,
    },
    reducers:{
        setPaginationPage:(state,action)=>{
            state.pagination.page=action.payload
        },
        setPaginationPerPage:(state,action)=>{
            state.pagination.perPage=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(addAddress.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(addAddress.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.loading = false
            state.error = null
            console.log(action.payload)
            //pushing new address to address array
            state.address.push(action.payload.address)
        })
        .addCase(addAddress.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(getAddress.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(getAddress.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.loading = false
            state.error = null
            console.log(action.payload)
            state.address = action.payload.address
        })
        .addCase(getAddress.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(getAllUsers.pending,(state)=>{
            state.allUsersLoading = true
            state.allUsersError = null
        })
        .addCase(getAllUsers.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.allUsersLoading = false
            state.allUsersError = null
            state.users=action.payload.users
            state.pagination=action.payload.pagination

        })
        .addCase(getAllUsers.rejected,(state,action)=>{
            state.allUsersLoading = false
            state.allUsersError = action.payload
        })
        // .addCase(selectAddress.pending,(state)=>{
        //     state.loading = true
        //     state.error = null
        // })
        // .addCase(selectAddress.fulfilled,(state,action)=>{
        //     console.log(action.payload)
        //     state.loading = false
        //     state.error = null
        //     console.log(action.payload)
        //     // state.address = action.payload.address
        // })
        // .addCase(selectAddress.rejected,(state,action)=>{
        //     state.loading = false
        //     state.error = action.payload
        // })
          .addCase(deleteUser.pending,(state)=>{
                    // state.loading = true
                    state.error = null
                })
                .addCase(deleteUser.fulfilled,(state,action)=>{
                    // state.loading = false
                    state.error = null
                    state.pagination.totalUsers-=1
                    state.users = state.users.filter(user=>user._id !== action.payload.id)
                })
                .addCase(deleteUser.rejected,(state,action)=>{
                    // state.loading = false
                    state.error = action.payload.error || 'Failed to delete user'
                })
         
                .addCase(deleteMultipleUsers.pending,(state)=>{
                    state.loading = true,
                    state.error=false
                })
                .addCase(deleteMultipleUsers.fulfilled,(state,action)=>{
                    state.loading=false,
                    state.error=false,
                    state.pagination.totalUsers-=action.payload.ids?.length
                    state.users = state.users.filter(user=>!action.payload.ids.includes(user._id))
                    
                })
                .addCase(deleteMultipleUsers.rejected,(state,action)=>{
                        state.loading=false, 
                    state.error=false
                    state.error=action.payload.error || 'Failed to delete users'
        
        
                })
                .addCase(updateUserRoles.pending,(state,action)=>{
                    state.updateLoading = action.meta.arg.userId,
                    state.error=false
                })
                .addCase(updateUserRoles.fulfilled,(state,action)=>{
                    state.updateLoading=false,
                    state.error=false

                    const updatedUserIndex = state.users.findIndex(u=>u._id===action.payload.id)
                    state.users[updatedUserIndex]=action.payload.user


                    
                })
                .addCase(updateUserRoles.rejected,(state,action)=>{
                        state.updateLoading=false, 
                    state.error=false
                    state.error=action.payload.error || 'Failed to delete users'
        
        
                })
                .addCase(updateUserStatus.pending,(state,action)=>{
                    state.updateLoading = action.meta.arg.userId,
                    state.error=false
                })
                .addCase(updateUserStatus.fulfilled,(state,action)=>{
                    state.updateLoading=false,
                    state.error=false

                    const updatedUserIndex = state.users.findIndex(u=>u._id===action.payload.id)
                    state.users[updatedUserIndex]=action.payload.user


                    
                })
                .addCase(updateUserStatus.rejected,(state,action)=>{
                        state.updateLoading=false, 
                    state.error=false
                    state.error=action.payload.error || 'Failed to delete users'
        
        
                })
    }
})

export const{setPaginationPage,setPaginationPerPage}=userSlice.actions
export default userSlice.reducer