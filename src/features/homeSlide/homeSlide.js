import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const addHomeSlide = createAsyncThunk('homeSlide/addHomeSlide',async(formData,{rejectWithValue})=>{
    try {
        const result = await axios.post('/api/homeSlides/create',formData)
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Product add failed')
        }
        return result.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Product add failed')
        
    }
})

export const getHomeSlides=createAsyncThunk('homeSlide/getHomeSlides',async(_,{rejectWithValue})=>{
    try {
        console.log('inside gethome slides')
        const result=await axios.get('/api/homeSlides')
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
export const deleteHomeSlide=createAsyncThunk('homeSlide/deleteHomeSlide',async(id,{rejectWithValue})=>{

    try {
        console.log(id)
        const result=await axios.delete(`/api/homeSlides?id=${id}`)
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

const homeSlideSlice = createSlice({
    name:"homeSlide",
    initialState:{
        homeSlides:[],
        currentHomeSlide:null
    },
    reducers:{
        // addHomeSlideImage:(state,action)=>{
        //     state.currentHomeSlide=action.payload

        // },
        // removeHomeSlideImage:(state,action)=>{
        //     state.currentHomeSlide=null
        // }
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
              state.loading = true
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