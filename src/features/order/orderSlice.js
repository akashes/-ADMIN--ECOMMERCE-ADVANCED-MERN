
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const getOrders = createAsyncThunk('order/getOrders',async({page=1,limit=10, search = "", payment_method = "", payment_status = "", order_status = ""}={},{rejectWithValue})=>{
       try {
              const params = new URLSearchParams({
        page,
        limit,
      });

      if (search) params.append("search", search);
      if (payment_method) params.append("payment_method", payment_method);
      if (payment_status) params.append("payment_status", payment_status);
      if (order_status) params.append("order_status", order_status);

      console.log(page,limit,search,payment_method,payment_status,order_status)

      const result = await axios.get(`/api/order/get-all-orders-admin?${params.toString()}`);
        // const result = await axios.get(`/api/order/get-all-orders-admin?page=${page}&limit=${limit}`)
            if(!result.data.success){
            throw new Error(result.data.message || 'Failed to get orders  ')
        }
        console.log(result)
        return result.data
    } catch (error) {
      return  rejectWithValue(error.response?.data?.message || error.message)
        
    }

})
export const updateOrderStatus = createAsyncThunk('order/updateOrderStatus',async({orderId,status},{rejectWithValue})=>{
       try {
        const result = await axios.put(`/api/payment/update-order-status/${orderId}`,{status})
            if(!result.data.success){
            throw new Error(result.data.message || 'Failed to update order status ')
        }
        console.log(result)
        return result.data
    } catch (error) {
      return  rejectWithValue(error.response?.data?.message || error.message)
        
    }

})



const orderSlice = createSlice({
    name:"order",
    initialState:{
        loading:false,
        orders:[],
        error:null,
        pagination:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
                builder.addCase(getOrders.pending,(state)=>{
                    state.loading=true
                    state.error=null
                })
                builder.addCase(getOrders.fulfilled,(state,action)=>{
                    state.loading=false
                    state.orders=action.payload.orders
                        state.pagination = action.payload.pagination;

                    state.error=null
                })
                builder.addCase(getOrders.rejected,(state,action)=>{
                    state.loading=false
                    state.error=action.payload || 'Failed to get Orders'
                })
                builder.addCase(updateOrderStatus.pending,(state)=>{
                    state.loading=true
                    state.error=null
                })
             builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.orders.findIndex(o => o._id === action.payload.order._id);
                if (index !== -1) {
                    state.orders[index] = action.payload.order;  
                }
                state.error = null;
                });
                builder.addCase(updateOrderStatus.rejected,(state,action)=>{
                    state.loading=false
                    state.error=action.payload || 'Failed to update order status'
                })
    }


})

export default orderSlice.reducer