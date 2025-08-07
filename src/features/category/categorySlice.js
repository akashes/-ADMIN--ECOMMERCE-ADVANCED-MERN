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

export const getCategories=createAsyncThunk('category/getCategories',async(_,{rejectWithValue})=>{
    try {
        console.log('inside get categores slice')
        const result = await axios.get('/api/category')
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Categories get failed')
        }
        return result.data

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Categories get failed')
        
    }
})

export const updateCategory = createAsyncThunk('category/updateCategory',async(category,{rejectWithValue,getState})=>{
    try {
        const state = getState()
        const categoryImages = state.category.categoryImages
        const result = await axios.put(`/api/category/update-category/${category.id}`,{...category,categoryImages})
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Category update failed')
        }
        return result.data
            }
            catch(error){
                return rejectWithValue(error.response?.data?.message || error.message || 'Category update failed')

            }
 })

 export const deleteCategory = createAsyncThunk('category/deleteCategory',async(id,{rejectWithValue})=>{
    try {
        const result = await axios.delete(`/api/category/delete-category/${id}`)
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Category delete failed')
        }
        return result.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Category delete failed')
        
    }
 })

  export const updateSubCategory = createAsyncThunk('category/updateSubCategory',async(category,{rejectWithValue})=>{
    try {
        const result = await axios.put(`/api/category/update-sub-category/${category.id}`,category)
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Sub category update failed')
        }
        return result.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Sub category update failed')
        
    }
  })




const categorySlice = createSlice({
    name:'category',
    initialState:{
        categories:[],
        loading:false,
        error:null,
        categoryImages:[],
        editSelectedCategory:null
    },
    reducers:{
        setCategoryImages:(state,action)=>{
            console.log(action.payload)
            state.categoryImages = action.payload
        },
        setEditSelectedCategory:(state,action)=>{
            state.editSelectedCategory = action.payload
        },
        clearEditSelectedCategory:(state)=>{
            state.editSelectedCategory = null
        }
    },
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
       .addCase(getCategories.pending,(state)=>{
           state.loading = true
           state.error = null
       })
       .addCase(getCategories.fulfilled,(state,action)=>{
           state.loading = false
           state.error = null
           state.categories = action.payload.categories
       })
       .addCase(getCategories.rejected,(state,action)=>{
           state.loading = false
           state.error = action.payload || 'Categories get failed'
       })
       .addCase(updateCategory.pending,(state)=>{
        state.loading =true
        state.error = null

       })
       .addCase(updateCategory.fulfilled,(state,action)=>{
        state.loading = false
        state.error = null
        state.categories = state.categories.map(category=>category._id === action.payload.category._id ? action.payload.category : category)
       })
       .addCase(updateCategory.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
       })
       .addCase(deleteCategory.pending,(state)=>{
        state.loading =true
        state.error = null

       })
       .addCase(deleteCategory.fulfilled,(state,action)=>{
        state.loading = false
        state.error = null
       })
       .addCase(deleteCategory.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload?.error || 'Category delete failed'
       })
       .addCase(updateSubCategory.pending,(state)=>{
        state.loading =true
        state.error = null

       })
       .addCase(updateSubCategory.fulfilled,(state,action)=>{
        state.loading = false
        state.error = null
        // state.categories = state.categories.map(category=>category._id === action.payload.category._id ? action.payload.category : category)
       })
       .addCase(updateSubCategory.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
       })
    }
})


export default categorySlice.reducer
export const {setEditSelectedCategory,clearEditSelectedCategory,setCategoryImages} = categorySlice.actions