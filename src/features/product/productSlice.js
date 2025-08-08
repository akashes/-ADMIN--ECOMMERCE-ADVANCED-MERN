import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import reducer from "../category/categorySlice";

export const addProduct = createAsyncThunk('product/addProduct',async(product,{rejectWithValue,getState})=>{
    try {
        const state = getState()
        const images = state.product.productImages
        const result = await axios.post('/api/product/create',{...product,images})
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Product add failed')
        }
        return result.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Product add failed')
        
    }
})

export const addProductImages = createAsyncThunk('product/addProductImages',async(productImages,{rejectWithValue})=>{
    try {
        const result = await axios.post('/api/product/upload-product-images',productImages)
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Product image add failed')
        }
        return result.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Product image add failed')
        
    }
})

export const deleteProductImagesDuringCreation= createAsyncThunk('product/deleteProductImagesDuringCreation',async(public_id,{rejectWithValue})=>{
    try {
        const result = await axios.delete(`/api/product/delete-image-during-creation?public_id=${encodeURIComponent(public_id)}`)
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Product image delete failed')
        }
        return result.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Product image delete failed')
        
    }
})

export const getAllProducts = createAsyncThunk('product/getAllProducts',async({page=1,perPage=10},{rejectWithValue})=>{
    try {
        const result = await axios.get(`/api/product/get-all-products?page=${page}&perPage=${perPage}`)
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Products get failed')
        }
        return result.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Products get failed')
        
    }
})  

const productSlice = createSlice({
    name:'product',
    initialState:{
        loading:false,
        error:null,
        productAdded:false,
        productImages:[],
        products:[],
        totalProducts:null,
        totalPages:null,
        currentPage:null
    },
    reducers:{
        setProductAdded:(state,action)=>{
            state.productAdded = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addProduct.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        builder.addCase(addProduct.fulfilled,(state,action)=>{
            // state.products.push(action.payload.product)
            state.loading = false
            state.error = null
            state.productImages = []
        })
        .addCase(addProduct.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload.error || 'Product add failed'
        })
        .addCase(addProductImages.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(addProductImages.fulfilled,(state,action)=>{
            state.productImages.push(...action.payload.productImages)
        })
        .addCase(addProductImages.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload.error || 'Product image add failed'
        })
        .addCase(deleteProductImagesDuringCreation.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(deleteProductImagesDuringCreation.fulfilled,(state,action)=>{
            state.loading = false
            state.error = null
            console.log(action.payload)
            state.productImages = state.productImages.filter(image=>image.public_id !== action.payload.id)
        })
        .addCase(deleteProductImagesDuringCreation.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload.error || 'Product image delete failed'
        })
        .addCase(getAllProducts.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(getAllProducts.fulfilled,(state,action)=>{
            state.products = action.payload.products
            state.totalProducts = action.payload.totalProducts
            state.totalPages = action.payload.totalPages
            state.currentPage = action.payload.currentPage
            state.loading = false
            state.error = null
        })
        .addCase(getAllProducts.rejected,(state,action)=>{
            state.loading = false
            console.log(action.payload)
            state.error = action.payload.error || 'Products get failed'
        })
    }
})

export const{setProductAdded}=productSlice.actions
export default productSlice.reducer