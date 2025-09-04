
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const getDashboardDetails = createAsyncThunk('dashboard/getDashboardDetails',async(_,{rejectWithValue})=>{
       try {
                const result = await axios.get("/api/admin/dashboard-stats");

  

        // const result = await axios.get(`/api/order/get-all-orders-admin?page=${page}&limit=${limit}`)
            if(!result.data.success){
            throw new Error(result.data.message || 'Failed to get dashboard details  ')
        }
        console.log(result)
        return result.data
    } catch (error) {
      return  rejectWithValue(error.response?.data?.message || error.message)
        
    }

})




const dashboardSlice = createSlice({
    name:"dashboard",
    initialState:{
        loading:false,
        error:null,
        stats:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getDashboardDetails.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(getDashboardDetails.fulfilled,(state,action)=>{
            state.loading=true,
            state.error=null
            state.stats = action.payload.data
        })
        builder.addCase(getDashboardDetails.rejected,(state)=>{
            state.loading=false,
            state.error=action.payload || 'Failed to get dashboard details'
            
        })
    }


})

export default dashboardSlice.reducer