import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";


export const addHomeSlide = createAsyncThunk('homeSlide/addHomeSlide',async(formData,{rejectWithValue})=>{
    try {
        const result = await axiosInstance.post('/api/homeSlides/create',formData)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to add Home Slide')
        }
        return result.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to add Home Slide')
        
    }
})

export const getHomeSlides=createAsyncThunk('homeSlide/getHomeSlides',async(_,{rejectWithValue})=>{
    try {
        const result=await axiosInstance.get('/api/homeSlides')
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to fetch Home-slides')
        }
        return result.data

        
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch Home-slides')

        
    }
})
export const deleteHomeSlide=createAsyncThunk('homeSlide/deleteHomeSlide',async(id,{rejectWithValue})=>{

    try {
        const result=await axiosInstance.delete(`/api/homeSlides?id=${id}`)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to delete Home Slide')
        }
        return result.data

        
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to delete Home Slide')

        
    }
})

const homeSlideSlice = createSlice({
    name:"homeSlide",
    initialState:{
        homeSlides:[],
        currentHomeSlide:null
    },
    reducers:{
     
    },
   extraReducers:(builder)=>{
              builder.addCase(addHomeSlide.pending,(state)=>{
              state.loading = true
              state.error = null
          }),
          builder.addCase(addHomeSlide.fulfilled,(state,action)=>{
              state.loading = true
              state.error = null
          }),
          builder.addCase(addHomeSlide.rejected,(state)=>{
              state.loading = false
              state.error = null
          })
          builder.addCase(getHomeSlides.pending,(state)=>{
              state.loading = true
              state.error = null
          }),
          builder.addCase(getHomeSlides.fulfilled,(state,action)=>{
              state.loading = true
              state.error = null
              state.homeSlides=action.payload.homeSlides
          }),
          builder.addCase(getHomeSlides.rejected,(state)=>{
              state.loading = true
              state.error = null
          })
          builder.addCase(deleteHomeSlide.pending,(state)=>{
              state.loading = true
              state.error = null
          }),
          builder.addCase(deleteHomeSlide.fulfilled,(state,action)=>{
              state.loading = true
              state.error = null
              state.homeSlides = state.homeSlides.filter((slide)=>slide._id!==action.payload.id)
          }),
          builder.addCase(deleteHomeSlide.rejected,(state)=>{
              state.loading = true
              state.error = null
          })
    }
})




export const{addHomeSlideImage,removeHomeSlideImage}=homeSlideSlice.actions
export default homeSlideSlice.reducer