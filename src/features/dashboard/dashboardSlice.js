
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const getDashboardDetails = createAsyncThunk('dashboard/getDashboardDetails',async(_,{rejectWithValue})=>{
       try {
                const result = await axios.get("/api/admin/dashboard-stats");

  

            if(!result.data.success){
            throw new Error(result.data.message || 'Failed to get dashboard details  ')
        }
        console.log(result)
        return result.data
    } catch (error) {
      return  rejectWithValue(error.response?.data?.message || error.message)
        
    }

})

const INITIAL_STATE = {
    loading:false,
        error:null,
        stats:null

}


const dashboardSlice = createSlice({
    name:"dashboard",
    initialState:INITIAL_STATE,
    reducers:{

        //to react to socket connection on orders
        updateOrderStats:(state)=>{
                if(state.stats){
                Object.keys(state.stats.orders).forEach(range=>{
                    state.stats.orders[range]+=1
                })
            }
        }

        

    },
    extraReducers:(builder)=>{
        builder.addCase(getDashboardDetails.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(getDashboardDetails.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null
            state.stats = action.payload.data
        })
        builder.addCase(getDashboardDetails.rejected,(state)=>{
            state.loading=false,
            state.error=action.payload || 'Failed to get dashboard details'
            
        })
    }


})
export const {updateOrderStats}=dashboardSlice.actions
export default dashboardSlice.reducer