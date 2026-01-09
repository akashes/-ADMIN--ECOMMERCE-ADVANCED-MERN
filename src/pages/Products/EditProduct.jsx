import React, { useContext, useEffect, useRef, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Rating from '@mui/material/Rating';
import UploadBox from "../../components/UploadBox";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoIosClose } from "react-icons/io";
import { Button, CircularProgress } from "@mui/material";
import { IoMdCloudUpload } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, addProductImages, addProductImagesDuringUpdation, deleteProductImageDuringUpdation, getAllProducts, getSingleProduct, setProductAdded, updateProduct } from "../../features/product/productSlice";
import { showError, showSuccess, showWarning } from "../../utils/toastUtils";
import { getCategories } from "../../features/category/categorySlice";
import { MyContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

const attributeSuggestions = {
  main: {
    fashion: {
      attributes: ["Size", "Weight", "Color"],
      lockedKeys: ['Size']
    },
    laptops: {
      attributes: ["Processor", "RAM", "Graphics"],
      lockedKeys: ["Processor"]
    }
  },
  sub: {
    smartphone: {
      attributes: ["Camera", "OS"],
      lockedKeys: ["OS"]
    },
    tshirt: {
      attributes: ["Size", "Material"],
      lockedKeys: []
    }
  },
  third: {
    gaming: {
      attributes: ["Cooling System", "Refresh Rate"],
      lockedKeys: ["Cooling System"]
    }
  }
};

const mergeAttributeSuggestions = (catName, subCatName, thirdCatName) => {
  const seenKeys = new Set();
  const merged = [];

  const levels = [
    attributeSuggestions.main[catName?.toLowerCase()],
    attributeSuggestions.sub[subCatName?.toLowerCase()],
    attributeSuggestions.third[thirdCatName?.toLowerCase()]
  ];

  for (const level of levels) {
    if (!level) continue;
    for (const key of level.attributes) {
      if (!seenKeys.has(key)) {
        merged.push({
          key,
          value: '',
          locked: level.lockedKeys.includes(key)
        });
        seenKeys.add(key);
      }
    }
  }

  return merged;
};




const EditProduct = () => {
  
  const dispatch = useDispatch()
  const context = useContext(MyContext)
  const navigate = useNavigate()
  const{categories}=useSelector(state=>state.category)
  const{productImages,currentProduct}=useSelector(state=>state.product)
  console.log(currentProduct)
  const[isUploading, setIsUploading] = useState(false)
  // const[productSubmitted, setProductSubmitted] = useState(false)
  const[loading, setLoading] = useState(false)
  // const productSubmittedRef = useRef(false)
  

  // const [attributes, setAttributes] = useState([{ key: '', value: '' }]);
  const [attributes, setAttributes] = useState([]);

const handleAttributeChange = (index, field, value) => {
  console.log(index,field,value)
  const newAttrs = [...attributes];
  newAttrs[index][field] = value;
  setAttributes(newAttrs);
};

const addAttributeField = () => {
  setAttributes([...attributes, { key: '', value: '' }]);
};

const removeAttributeField = (e,index) => {
  e.preventDefault()

  const newAttrs = attributes.filter((_, i) => i !== index);
  setAttributes(newAttrs);
};


console.log(attributes)

      const[suggestedFields, setSuggestedFields] = useState([]);

      const[formFields,setFormFields]=useState({
        name:'',
        description:"",
        catName:"",
        category:"",//id 
        subCat:"", //name
        subCatId:"",
        thirdSubCat:"", //name
        thirdSubCatId:"",
        countInStock:0,
        price:0,
        oldPrice:0,
        brand:"",
        isFeatured:false,

            })

            const onChangeInput=(e)=>{
                const{name,value}=e.target
                setFormFields({
                    ...formFields,
                    [name]:value
                })
            }

const handleChangeProductCat = (event) => {
  const selectedCategoryId = event.target.value;
  const selectedCategoryObj = categories.find(cat => cat._id === selectedCategoryId);
  const selectedCategoryName = selectedCategoryObj?.name?.toLowerCase() || '';

  setFormFields(prev => ({
    ...prev,
    category: selectedCategoryId,
    catName: selectedCategoryName,
    subCat: '',
    subCatId: '',
    thirdSubCat: '',
    thirdSubCatId: ''
  }));

  const mergedAttributes = mergeAttributeSuggestions(selectedCategoryName, '', '');
  setAttributes(mergedAttributes);
};

const handleChangeProductSubCat = (event) => {
  const newSubCatId = event.target.value;

  const subCatName =
    selectedRootCategory?.children?.find(child => child._id === newSubCatId)?.name?.toLowerCase() || '';

  setFormFields((prev) => ({
    ...prev,
    subCat: subCatName,
    subCatId: newSubCatId,
    thirdSubCat: '',
    thirdSubCatId: ''
  }));

  const mergedAttributes = mergeAttributeSuggestions(formFields.catName, subCatName, '');
  setAttributes(mergedAttributes);
};




const handleChangeThirdLevelSubCat = (event) => {
  const newThirdLevelSubCatId = event.target.value;
  const thirdLevelSubCatName = thirdLevelCategories.find(cat => cat._id === newThirdLevelSubCatId)?.name?.toLowerCase() || '';

  setFormFields(prev => ({
    ...prev,
    thirdSubCat: thirdLevelSubCatName,
    thirdSubCatId: newThirdLevelSubCatId
  }));

  const mergedAttributes = mergeAttributeSuggestions(formFields.catName, formFields.subCat, thirdLevelSubCatName);
  setAttributes(mergedAttributes);
};




console.log(formFields)
console.log(attributes)

const handleAddProduct=async(e)=>{
  e.preventDefault()
  //input validation 
  if(!formFields.name){
    showWarning('Please enter product name')
    return
  }
  if(!formFields.description){
    showWarning('Please enter product description')
    return
  }
  if(!formFields.category){
    showWarning('Please select a category')
    return
  }
  if(!formFields.countInStock){
    showWarning('Please enter product count in stock')
    return
  }
  if(!formFields.price){
    showWarning('Please enter product price')
    return
  }
  if(!formFields.oldPrice){
    showWarning('Please enter product old price')
    return
  }
  if(!formFields.brand){
    showWarning('Please enter product brand')
    return
  }
  if(productImages.length===0){
   showWarning('atleast one image is needed for product')
  }
  // if(!formFields.images.length){
  //   showWarning('Please upload at least one image')
  //   return
  // }

   //constructing final payload with dynamic values

    const attributeMap = {};
    if (Array.isArray(attributes)) {
      attributes.forEach(({ key, value }) => {
        if (key && value !== undefined) {
          attributeMap[key] = value;
        }
      });
    }
    console.log(attributeMap)
   const productData = {
    ...formFields,
    attributes: attributeMap
   }


   console.log(productData)
      if (!productData.subCatId) delete productData.subCatId;
if (!productData.thirdSubCatId) delete productData.thirdSubCatId;
console.log(productData)
setLoading(true)
   const resultAction =await dispatch(updateProduct(productData))
   console.log(resultAction)
   if(updateProduct.fulfilled.match(resultAction)){
    console.log('add product fullfilled')
    setLoading(false)
    showSuccess(resultAction.payload.message || 'Product added successfully')
    console.log('product added successfully')
    console.log('dispatching get all products')
    await dispatch(getAllProducts())
    console.log('get all products dispatched')
    setFormFields({name:'',description:"",catName:"",category:"",subCat:"",subCatId:"",thirdSubCat:"",thirdSubCatId:"",countInStock:0,price:0,oldPrice:0,rating:0,brand:"",isFeatured:false,})
    setAttributes([])
    context.setIsAddProductModalOpen({open:false,modal:''})
    navigate('/products')
    setProductAdded(true)
      



   }
   if(addProduct.rejected.match(resultAction)){
    setLoading(false)
    showError(resultAction.payload || 'Failed to add product')
   }



}
  const handleImageChange=async(e)=>{

          const filesArray=Array.from(e.target.files)
          
          if(filesArray.length===0) return;

       const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

          const allValid = filesArray.every((file) =>
            validTypes.includes(file.type)
          );

          if (!allValid) {
            showError('Please select valid image files');
            return;
          }

          console.log('valid image types');
          setIsUploading(true)
          try {
               const formData = new FormData()
               filesArray.forEach((file)=>formData.append('productImages',file))
  
      
          console.log('calling with formdata',formData)
          const resultAction = await dispatch( addProductImagesDuringUpdation(formData))
          console.log(resultAction)
         if(addProductImagesDuringUpdation.fulfilled.match(resultAction)){
             showSuccess('image uploaded successfully')

       
         }
         if(addProductImagesDuringUpdation.rejected.match(resultAction)){
             showError(resultAction.payload || 'Failed to upload image')
         }
              
          } catch (error) {
              console.log('upload error',error.response?.data || error.message)
              showError(error.response?.data?.message || error.message)
          }finally{
              setIsUploading(false)
          }
          
         
       
  }


    const handleRemoveImage=async(id)=>{
    const resultAction=  await dispatch(deleteProductImageDuringUpdation(id))
    console.log(resultAction)
    if(deleteProductImageDuringUpdation.fulfilled.match(resultAction)){
      showSuccess(resultAction.payload.message || 'Image deleted successfully')
    }
    if(deleteProductImageDuringUpdation.rejected.match(resultAction)){
      showError(resultAction.payload || 'Failed to delete image')
    }
    
    } 





const selectedRootCategory = categories.find((category) => category._id === formFields.category);
const subCategories = selectedRootCategory?.children || [];
const selectedSubCategory = subCategories.find((category) => category._id === formFields.subCatId);
const thirdLevelCategories = selectedSubCategory?.children || [];

useEffect(()=>{

  dispatch(getCategories())


},[])

useEffect(()=>{
  if(context?.isAddProductModalOpen?.id){
    let userId  = context?.isAddProductModalOpen?.id

    const fetchSingleProduct=async()=>{
      await  dispatch(getSingleProduct(userId))
      
    }
    fetchSingleProduct()
  }


},[context?.isAddProductModalOpen?.id,dispatch,context.isAddProductModalOpen])
useEffect(()=>{
  if(currentProduct){

    setFormFields(prev => ({
      ...prev,
      id:currentProduct._id,
      name:currentProduct.name,
      description:currentProduct.description,
        catName:currentProduct.catName,
        category:currentProduct.category?._id,//id 
        subCat:currentProduct.subCat, //name
        subCatId:currentProduct.subCatId,
        thirdSubCat:currentProduct.thirdSubCat, //name
        thirdSubCatId:currentProduct.thirdSubCatId,
        countInStock:currentProduct.countInStock,
        price:currentProduct.price,
        oldPrice:currentProduct.oldPrice,
        brand:currentProduct.brand,
        isFeatured:currentProduct.isFeatured,
  }));
  if(currentProduct?.attributes){

    const attributesArray = Object.entries(currentProduct.attributes).map(([key,value])=>({
      key,
      value
    }))
    setAttributes(attributesArray)
  }
  
}
},[currentProduct])





  return (
    <section className="p-5 bg-gray-50">
      <form onSubmit={handleAddProduct} className="addProductForm  p-8 py-3 ">
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4">

        <div className="grid grid-cols-1 mb-3">
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Name</h3>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm text-sm "
              value={formFields.name}
              onChange={onChangeInput}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 mb-3">
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Description</h3>
            <textarea
              type="text"
              name="description"
              className="w-full h-[140px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm text-sm "
              value={formFields.description}
              onChange={onChangeInput}
              placeholder="description should not exceed 500 characters"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 mb-3 gap-4">
          {
            categories.length!==0 && (
               <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Category</h3>
            <Select
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0,0,0,0.2)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0,0,0,0.4)', 
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0,0,0,0.5)', 
                outline:'none'
              },
            }}
          labelId="productCatDropLabel"
          id="productCatDrop"
          name="category"
          value={formFields.category}
          label="Product Category"
          size="small"
          className="w-full border-[rgba(0,0,0,0.1)] focus:!outline-none focus:!border-[rgba(0,0,0,0.5)] "
          onChange={handleChangeProductCat}
        >
          {
            categories&& categories.map((category,index)=><MenuItem className="!flex !justify-between" key={index} value={category._id}>
              {category.name} 
              {/* <img src={category.images[0].url} alt="" width={20} /> */}
               </MenuItem>)
          }
        
        </Select>
          </div>

            )
          }
         
         {
          subCategories.length!==0 && (
              <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Sub Category</h3>
  <Select
  sx={{
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0,0,0,0.2)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0,0,0,0.4)', 
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0,0,0,0.5)', 
      outline:'none'
    },
  }}
          labelId="productCatDropLabel"
          disabled={!selectedRootCategory}
          id="productCatDrop"
          name="subCatId"
          value={formFields.subCatId}
          label="Product Category"
          size="small"
          className="w-full border-[rgba(0,0,0,0.1)] focus:!outline-none focus:!border-[rgba(0,0,0,0.5)] "
          onChange={handleChangeProductSubCat}
        >
          {
            subCategories&& subCategories.map((category,index)=><MenuItem key={index} value={category._id}>{category.name}</MenuItem>)
          }
        </Select>
          </div>

          )
         }

         {
          thirdLevelCategories.length!==0 && (
                 <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Third Sub Category</h3>
  <Select
  sx={{
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0,0,0,0.2)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0,0,0,0.4)', 
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0,0,0,0.5)', 
      outline:'none'
    },
  }}
          labelId="productCatDropLabel"
          disabled={!selectedSubCategory}
          name="thirdSubCatId"
          value={formFields.thirdSubCatId}
          label="Product Category"
          size="small"
          className="w-full border-[rgba(0,0,0,0.1)] focus:!outline-none focus:!border-[rgba(0,0,0,0.5)] "
          onChange={handleChangeThirdLevelSubCat}
        >
          {
            thirdLevelCategories&& thirdLevelCategories.map((category,index)=><MenuItem key={index} value={category._id}>{category.name}</MenuItem>)
          }
        </Select>
          </div>

          )
        }
        
         
          
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black"> Old Price</h3>
            <input
            
              type="number"
              name="oldPrice"
              id="oldPrice"

              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)]
               rounded-sm text-sm "
               value={formFields.oldPrice}
               onChange={onChangeInput}
            />
          </div>
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">New Price</h3>
            <input
            
              type="number"
              name="price"
              id="price"
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)]
               rounded-sm text-sm "
               value={formFields.price}
               onChange={onChangeInput}
            />
          </div>  
          {/* product featured */}
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Is Featured?</h3>
          <Select
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0,0,0,0.2)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0,0,0,0.4)', 
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0,0,0,0.5)', 
              outline:'none'
            },
          }}
          labelId="productCatDropLabel"
          name="isFeatured"
          value={formFields.isFeatured}
          label="Product Category"
          size="small"
          className="w-full border-[rgba(0,0,0,0.1)] focus:!outline-none focus:!border-[rgba(0,0,0,0.5)] "
          onChange={onChangeInput}
        >
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
        </Select>
          </div>
          {/* stock */}
           <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Stock</h3>
            <input
            
              type="number"
              name="countInStock"
              value={formFields.countInStock}
              id="price"
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)]
               rounded-sm text-sm "
               onChange={onChangeInput}
            />
          </div>
          {/* brand */}
           <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Brand</h3>
            <input
            
              type="text"
              name="brand"
              id="price"
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)]
               rounded-sm text-sm "
               value={formFields.brand}
               onChange={onChangeInput}
            />
          </div>
          {/* discount */}
            {/* <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Discount</h3>
            <input
            
              type="text"
              name="price"
              id="price"
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)]
               rounded-sm text-sm "
            />
          </div> */}

      
        </div>
        <div className="grid grid-cols-4 mb-3 gap-4">
    
          {/* rating */}
          {/* <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Rating</h3>
                 <Rating name="half-rating" defaultValue={2.5} precision={0.5}
                 
                 />

          </div>   */}
       

      
        </div>
        <hr className="my-5 !text-gray-400" />
        {/* dynamic attributes */}
 {attributes && attributes.map((attr, i) => (
  <div key={i} className="flex gap-2 mb-2">
    <input
      value={attr.key}
      readOnly={attr.locked}
      placeholder="Attribute Key"
      onChange={(e) => handleAttributeChange(i, 'key', e.target.value)}
      className="border p-1 px-2 !bg-[#f1faff] rounded w-40 border-[rgba(0,0,0,0.3)] outline-none"
    />
    <input
      value={attr.value}
      placeholder="Value"
      onChange={(e) => handleAttributeChange(i, 'value', e.target.value)}
      className="border p-1 px-2 rounded w-40 !bg-[#f1faff] border-[rgba(0,0,0,0.3)] outline-none"
    />
    {/* hiding remove button for locked values */}
    {
      !attr.locked && (

        <button onClick={(e) => removeAttributeField(e,i)} className="cursor-pointer">
          <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1754588723/block_p6nqvy.png" alt="" width={23} />
        </button>
      )
    }
    {attr.locked && <span className="text-gray-400 inline-block my-auto  text-lg ">
      <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1754659588/locked_xdpwtn.png" alt="" width={25} />
      </span>}

  </div>
))}
<Button onClick={addAttributeField}>+ Add Custom Field</Button>



        {/* media and image section */}
        <div className="col w-full p-5 px-0">
            <h3 className="font-[700] text-[18px] mb-3">Media and Images</h3>
            <div className="grid grid-cols-7 gap-4 ">
              {
                productImages && productImages.length>0 && productImages.map((img,i)=>{
                  return(
                     <div className="uploadBoxWrapper relative">
                    <span className="absolute w-[20px] h-[20px] opacity-90 rounded-full overflow-hidden bg-primary top-[-5px] right-[-5px] cursor-pointer flex items-center justify-center z-50">
                        <IoIosClose className="text-white text-[19px]"  onClick={() => handleRemoveImage(img?.public_id)} />
                    </span>
                    
             <div className='uploadBox p-0 rounded-md  overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors flex flex-col justify-center items-center relative'>

                     <LazyLoadImage
                     className="w-full h-full object-cover"
                     effect="blur"
                         wrapperProps={{
                   style: {transitionDelay: "1s"},
    }}

      alt={"image"}
                            src={img.url}
                            />
                </div>
                 </div>
                  )
                })
              }
               
           

                <UploadBox multiple={true} onChange={handleImageChange} isUploading={isUploading} />
            </div>

        </div>
        </div>
        <hr />
        <br /> 
        <Button disabled={isUploading || loading} type="submit" className={`btn-blue btn-lg mt-3 w-full gap-1 ${isUploading  && '!opacity-70'}`} >
          {
            loading?<>
            <CircularProgress color="inherit" size={20} />
            <span>Updating Product...</span>
            </>:<>
            <IoMdCloudUpload className="text-[25px] text-white"/>
           Update Product
            
            </>
          }
            </Button>
     
      </form>
    </section>
  );
};

export default EditProduct;
