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


const userSlice = createSlice({
    name:'user',
    initialState:{
        address:[],
        loading:false,
        error:null,
        categoryImages:[],
    },
    reducers:{},
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
    }
})


export default userSlice.reducer