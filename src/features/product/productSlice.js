import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

// export const getAllProducts = createAsyncThunk('product/getAllProducts',async({page=1,perPage=10}={},{rejectWithValue})=>{
//     try {
//         console.log('get all products slice')
//         const result = await axios.get(`/api/product/get-all-products?page=${page}&perPage=${perPage}`)
//         console.log(result)
//         if(!result.data.success){
            
//             throw new Error(result.data.message || 'Products get failed')
//         }
//         return result.data
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.message || error.message || 'Products get failed')
        
//     }
// })  
export const getAllProducts = createAsyncThunk('product/getAllProducts',async(params,{rejectWithValue})=>{
    try {
        console.log('get all products slice')
        const result = await axios.get(`/api/product/get-all-products-admin`,{params})
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Products get failed')
        }
        return result.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Products get failed')
        
    }
})  

export const deleteProduct= createAsyncThunk('product/deleteProduct',async(productId,{rejectWithValue})=>{
    try {
        const result = await axios.delete(`/api/product/delete-product/${productId}`)
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Product delete failed')
        }
        return result.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Product delete failed')
        
    }
})


export const deleteMultipleProducts=createAsyncThunk('product/deleteMultipleProducts',async(ids,{rejectWithValue})=>{
    try {
        console.log(ids)
        const result = await axios.delete('/api/product/delete-multiple-products',{data:{ids}})
          console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to get product')
        }
        return result.data

        
        
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to delete products')

        
    }
})


export const getSingleProduct = createAsyncThunk('product/getSingleProduct',async(productId,{rejectWithValue})=>{
    try {
        const result = await axios.get(`/api/product/get-product/${productId}`)
         console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to get product')
        }
        return result.data

        
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to get product')
        
    }
})

export const deleteProductImageDuringUpdation=createAsyncThunk('product/deleteProductImageDuringUpdation',async(id,{rejectWithValue})=>{
    try {
        const result = await axios.delete(`/api/product/delete-image?public_id=${id}`)
          console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to get product')
        }
        return result.data 
        
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to delete product Image')

        
    }
})
export const addProductImagesDuringUpdation = createAsyncThunk('product/addProductImagesDuringUpdation',async(productImages,{rejectWithValue,getState})=>{
    try {
        const state = getState()
        const id = state.product.currentProduct._id
        if(!id)  throw new Error(`couldn't find product id to update image`)
        const result = await axios.post(`/api/product/upload-product-images-during-updation?productId=${id}`,productImages)
        console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Product image add failed')
        }
        return result.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Product image add failed')
        
    }
})
export const updateProduct = createAsyncThunk('product/updateProduct',async(productData,{rejectWithValue,getState})=>{
    try {
        const state = getState()
        const productId = state.product.currentProduct._id
        const result = await axios.put(`/api/product/update-product/${productId}`,productData)
           console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to get product')
        }
        return result.data 
        
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to update product')
    }
})
export const getSingleProductDataForProductDetailsPage = createAsyncThunk('product/getSingleProductDataForProductDetailsPage',async(productId,{rejectWithValue})=>{
    try {
        const result = await axios.get(`/api/product/get-product/${productId}`)
         console.log(result)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to get product')
        }
        return result.data

        
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to get product')
        
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
        currentPage:null,
        currentProduct:null
    },
    reducers:{
        setProductAdded:(state,action)=>{
            state.productAdded = action.payload
        },
   
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
            if(!action.payload) return
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
            state.error = action.payload || 'Products get failed'
        })
        .addCase(deleteProduct.pending,(state)=>{
            // state.loading = true
            state.error = null
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            // state.loading = false
            state.error = null
            state.totalProducts-=1
            console.log(action.payload)
            state.products = state.products.filter(product=>product._id !== action.payload.id)
        })
        .addCase(deleteProduct.rejected,(state,action)=>{
            // state.loading = false
            state.error = action.payload.error || 'Product delete failed'
        })
        .addCase(getSingleProduct.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(getSingleProduct.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
            state.currentProduct = action.payload.product
            state.productImages= action.payload.product.images
        })
        .addCase(getSingleProduct.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload.error || 'Failed to get product'
        })
        .addCase(deleteMultipleProducts.pending,(state)=>{
            state.loading = true,
            state.error=false
        })
        .addCase(deleteMultipleProducts.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=false,
            state.totalProducts-=action.payload.ids?.length
            state.products = state.products.filter(product=>!action.payload.ids.includes(product._id))
            
        })
        .addCase(deleteMultipleProducts.rejected,(state,action)=>{
                state.loading=false, 
            state.error=false
            state.error=action.payload.error || 'Failed to delete products'


        })
        .addCase(deleteProductImageDuringUpdation.pending,(state)=>{
            state.loading = true,
            state.error=false
        })
        .addCase(deleteProductImageDuringUpdation.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=false
console.log(action.payload)
console.log(state.currentProduct.images)
            state.productImages=state.productImages.filter((img)=>img.public_id!==action.payload.id)
            if(state.currentProduct) state.currentProduct.images = state.currentProduct.images.filter((img)=>img.public_id!==action.payload.id)
            
        })
        .addCase(deleteProductImageDuringUpdation.rejected,(state,action)=>{
                state.loading=false,
            state.error=false
            state.error=action.payload.error || 'Failed to delete product Image'


        })
            .addCase(addProductImagesDuringUpdation.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(addProductImagesDuringUpdation.fulfilled,(state,action)=>{
            state.productImages.push(...action.payload.productImages)
        })
        .addCase(addProductImagesDuringUpdation.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload.error || 'Product image add failed'
        })

        .addCase(updateProduct.pending,(state)=>{
            state.loading =true
            state.error=false
        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
            state.currentProduct=null
            state.productImages=[]
        })
        .addCase(updateProduct.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload.error || 'Failed to update product'

        })
           .addCase(getSingleProductDataForProductDetailsPage.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(getSingleProductDataForProductDetailsPage.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
            state.currentProduct = action.payload.product
        })
        .addCase(getSingleProductDataForProductDetailsPage.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload.error || 'Failed to get product'
        })
        

 
    }
})

export const{setProductAdded}=productSlice.actions
export default productSlice.reducer