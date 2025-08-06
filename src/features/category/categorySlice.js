import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const addCategoryImage = createAsyncThunk('category/addCategoryImage',async(categoryImages,{rejectWithValue})=>{
    try {
        const result = await axios.put('/api/category/upload-category-image',categoryImages)
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Category image add failed')
        }
        return result.data  

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Category image add failed')
        
    }
})

export const deleteCategoryImage = createAsyncThunk('category/deleteCategoryImage',async(public_id,{rejectWithValue})=>{
    try {
        const result = await axios.delete(`/api/category/delete-category-image?public_id=${encodeURIComponent(public_id)}`)
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Category image delete failed')
        }
        return result.data

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Category image delete failed')
    }
})
export const addCategory=createAsyncThunk('category/addCategory',async(category,{rejectWithValue,getState})=>{
    try {
        console.log('add category slice')
        const state = getState()
        const categoryImages = state.category.categoryImages
        console.log('creating category with category images',categoryImages)
        const result = await axios.post('/api/category/create-category',{...category,categoryImages})
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Category add failed')
        }
        return result.data

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Category add failed')
        
    }
})




const categorySlice = createSlice({
    name:'category',
    initialState:{
        categoryImages:[],
    },
    reducers:{},
    extraReducers:(builder)=>{
       builder.addCase(addCategoryImage.pending,(state)=>{
           state.loading = true
           state.error = null
       })
       .addCase(addCategoryImage.fulfilled,(state,action)=>{
           console.log(action.payload)
           state.loading = false
           state.error = null
           console.log(action.payload)
           //appending to category images array
           state.categoryImages.push(...action.payload.data)
       })
       .addCase(addCategoryImage.rejected,(state,action)=>{
           state.loading = false
           state.error = action.payload
       })
       .addCase(addCategory.pending,(state)=>{
           state.loading = true
           state.error = null
       })
       .addCase(addCategory.fulfilled,(state,action)=>{
           console.log(action.payload)
           state.loading = false
           state.error = null
           console.log(action.payload)
           //appending to category images array
        //    state.categoryImages.push(...action.payload.data)
        state.categoryImages=[]
       })
       .addCase(addCategory.rejected,(state,action)=>{
           state.loading = false
           state.error = action.payload || 'Category add failed'
       })
       .addCase(deleteCategoryImage.pending,(state)=>{
           state.loading = true
           state.error = null
       })
       .addCase(deleteCategoryImage.fulfilled,(state,action)=>{
           console.log(action.payload)
           state.loading = false
           state.error = null
           console.log(action.payload)
           //appending to category images array
        //    state.categoryImages.push(...action.payload.data)
        state.categoryImages = state.categoryImages.filter(image=>image.public_id!==action.payload.id)
       })
       .addCase(deleteCategoryImage.rejected,(state,action)=>{
           state.loading = false
           state.error = action.payload || 'Category image delete failed'
       })
    }
})


export default categorySlice.reducer