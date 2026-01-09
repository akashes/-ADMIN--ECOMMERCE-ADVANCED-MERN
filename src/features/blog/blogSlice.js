import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const createBlog=createAsyncThunk('blog/createBlog',async(formData,{rejectWithValue})=>{
    try {
         const result=await axios.post('/api/blog',formData)
         console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to Create Blog ')
        }
        return result.data

        
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to Create Blog')

    }
})
export const getAllBlogs=createAsyncThunk('blog/getAllBlogs',async(_,{rejectWithValue})=>{
    try {
         const result=await axios.get('/api/blog/get-all-blogs')
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to Create Blog ')
        }
        return result.data

        
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Category image add failed')

    }
})
export const deleteBlog=createAsyncThunk('blog/deleteBlog',async(id,{rejectWithValue})=>{
    try {
         const result=await axios.delete(`/api/blog/${id}`)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to Delete Blog ')
        }
        return result.data

        
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to delete Blog')

    }
})

export const getSingleBlog=createAsyncThunk('blog/getSingleBlog',async(id,{rejectWithValue})=>{
    try {
         const result=await axios.get(`/api/blog/${id}`)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to get Blog Details ')
        }
        return result.data

        
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to get Blog Details')

    }
})
export const updateBlog=createAsyncThunk('blog/updateBlog',async({id,formData},{rejectWithValue})=>{
    console.log(formData)
    try {
         const result=await axios.put(`/api/blog/${id}`,formData)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to Create Blog ')
        }
        return result.data

        
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Category image add failed')

    }
})



const blogSlice = createSlice({
    name:'blog',
    initialState:{
        loading:false,
        error:null,
        blogs:[],
        blog:null
    },
    reducers:{},
    extraReducers:(builder)=>{
            builder.addCase(createBlog.pending,(state)=>{
                   state.loading = true
                   state.error = null
               })
            builder.addCase(createBlog.fulfilled,(state,action)=>{
                   state.loading = false
                   state.error = null
               })
            builder.addCase(createBlog.rejected,(state)=>{
                   state.loading = true
                   state.error = null
               })
            builder.addCase(getAllBlogs.pending,(state)=>{
                   state.loading = true
                   state.error = null
               })
            builder.addCase(getAllBlogs.fulfilled,(state,action)=>{
                   state.loading = false
                   state.error = null
                   state.blogs = action.payload.blogs
               })
            builder.addCase(getAllBlogs.rejected,(state)=>{
                   state.loading = true
                   state.error = null
               })
            builder.addCase(deleteBlog.pending,(state)=>{
                   state.error = null
               })
            builder.addCase(deleteBlog.fulfilled,(state,action)=>{
                   state.error = null
                   state.blogs = state.blogs.filter((blog)=>blog._id!==action.payload.id)
               })
            builder.addCase(deleteBlog.rejected,(state)=>{
                   state.error = null
               })
            builder.addCase(getSingleBlog.pending,(state)=>{
                   state.loading = true
                   state.error = null
               })
            builder.addCase(getSingleBlog.fulfilled,(state,action)=>{
                   state.loading = false
                   state.error = null
                   state.blog = action.payload.blog
               })
            builder.addCase(getSingleBlog.rejected,(state)=>{
                   state.loading = true
                   state.error = null
               })
            builder.addCase(updateBlog.pending,(state)=>{
                   state.loading = true
                   state.error = null
               })
            builder.addCase(updateBlog.fulfilled,(state,action)=>{
                   state.loading = false
                   state.error = null
               })
            builder.addCase(updateBlog.rejected,(state)=>{
                   state.loading = true
                   state.error = null
               })
    }
})



export default blogSlice.reducer