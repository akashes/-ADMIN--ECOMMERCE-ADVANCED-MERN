
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
        stats:null,
        notifications:[],
        lastUpdated:null,
        isMuted:false

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
                });
                state.lastUpdated=new Date().toISOString();
            }
        },
        addNotification:(state,action)=>{
            state.notifications = [action.payload,...state.notifications].slice(0,10)
        },

        clearNotifications:(state)=>{
            state.notifications=[]
        },

        MarkAsRead:(state,action)=>{
            const index = state.notifications.findIndex(n=>n.id===action.payload)
            state.notifications[index].isRead=true
        },
        markAllAsRead:(state)=>{
            state.notifications.forEach(n=>n.isRead=true)
        },
        toggleIsMuted:(state)=>{
            state.isMuted=!state.isMuted
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
            state.stats = action.payload.data;
            //updating timestamp
            state.lastUpdated = new Date().toISOString()
        })
        builder.addCase(getDashboardDetails.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload || 'Failed to get dashboard details'
            
        })
    }


})
export const {updateOrderStats,addNotification,clearNotifications,MarkAsRead,markAllAsRead,toggleIsMuted}=dashboardSlice.actions
export default dashboardSlice.reducer