import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getFilterProducts = createAsyncThunk('bannerV1/getFilterProducts',async(form,{rejectWithValue})=>{
    try {
        console.log(form)
        const result=await axios.post('/api/bannerV1/get-products-by-category',form)
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Products get failed')
        }
        return result.data

        
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch Home-slides')

        
    }
})
export const addBannerV1 = createAsyncThunk('bannerV1/addBannerV1',async(formData,{rejectWithValue})=>{
    try {
        const result=await axios.post('/api/bannerV1',formData)
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to add Banner ')
        }
        return result.data

        
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to add Banner')

        
    }
})
export const getBannersV1 = createAsyncThunk('bannerV1/getBannersV1',async(_,{rejectWithValue})=>{
    try {
        const result=await axios.get('/api/bannerV1')
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to get Banners ')
        }
        return result.data

        
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to get Banners')

        
    }
})


export const deleteAdBannerV1=createAsyncThunk('bannerV1/deleteAdBannerV1',async(id,{rejectWithValue})=>{

    try {
        const result=await axios.delete(`/api/bannerV1?id=${id}`)
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Products get failed')
        }
        return result.data

        
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch Home-slides')

        
    }
})




const bannerV1Slice=createSlice({
    name:"bannerV1",
    initialState:{
        banners:[],
        loading:false,
        error:null,
        filterProducts:[]

    },
    reducers:{

    },
       extraReducers:(builder)=>{
                  builder.addCase(getFilterProducts.pending,(state)=>{
                  state.loading = true
                  state.error = null
              }),
              builder.addCase(getFilterProducts.fulfilled,(state,action)=>{
                  state.loading = false
                  state.error = null
                  state.filterProducts=action.payload.products
              }),
              builder.addCase(getFilterProducts.rejected,(state)=>{
                  state.loading = false
                  state.error = null
              })
                  builder.addCase(addBannerV1.pending,(state)=>{
                  state.loading = true
                  state.error = null
              }),
              builder.addCase(addBannerV1.fulfilled,(state,action)=>{
                  state.loading = false
                  state.error = null
                  state.filterProducts=[]

              }),
              builder.addCase(addBannerV1.rejected,(state)=>{
                  state.loading = false
                  state.error = null
              })
                  builder.addCase(getBannersV1.pending,(state)=>{
                  state.loading = true
                  state.error = null
              }),
              builder.addCase(getBannersV1.fulfilled,(state,action)=>{
                  state.loading = false
                  state.error = null
                  state.banners=action.payload.banners

              }),
              builder.addCase(getBannersV1.rejected,(state)=>{
                  state.loading = false
                  state.error = null
              })
                  builder.addCase(deleteAdBannerV1.pending,(state)=>{
                  state.error = null
              }),
              builder.addCase(deleteAdBannerV1.fulfilled,(state,action)=>{
                  state.error = null
                  state.banners = state.banners.filter((banner)=>banner._id!==action.payload.id)

              }),
              builder.addCase(deleteAdBannerV1.rejected,(state)=>{
                  state.error = null
              })
            }

})
export default bannerV1Slice.reducer