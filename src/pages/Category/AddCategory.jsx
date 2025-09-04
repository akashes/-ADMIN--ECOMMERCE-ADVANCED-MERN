import React, { useEffect, useState } from "react";

import Rating from "@mui/material/Rating";
import UploadBox from "../../components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoIosClose, IoMdCloudUpload } from "react-icons/io";
import { Button } from "@mui/material";
import { addCategory, addCategoryImage, deleteCategoryImage, getCategories } from "../../features/category/categorySlice";
import {  showError, showSuccess, showWarning } from "../../utils/toastUtils";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../features/user/userSlice";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const context = useContext(MyContext)
  const navigate = useNavigate()
  const {categoryImages } = useSelector(state=>state.category)
  const[loading,setLoading] = useState(false)
  const[isUploading,setIsUploading] = useState(false)
  const[previews,setPreviews] = useState([])
  const dispatch = useDispatch()
  const [formFields, setFormFields] = useState({
    name: "",
    // images: [],

  });
  // const handleImageChange = (e)=>{
  //   console.log('inside handle image change')
  //   const files = Array.from(e.target.files)
  //   console.log(files)
  //   const newPreviews = files.map((file)=>({
  //     file,
  //     preview: URL.createObjectURL(file)
  //   }))
  //   console.log(newPreviews)
  //   setPreviews(prev=>[...prev,...newPreviews])
  //   setFormFields(prev=>({
  //     ...prev,
  //     images:[...prev.images,...files]
  //   }))

  // }
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
               filesArray.forEach((file)=>formData.append('categoryImages',file))
  
      
          console.log('calling with formdata',formData)
          const resultAction = await dispatch( addCategoryImage(formData))
          console.log(resultAction)
         if(addCategoryImage.fulfilled.match(resultAction)){
             showSuccess('image uploaded successfully')

       
         }
         if(addCategoryImage.rejected.match(resultAction)){
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
  const resultAction=  await dispatch(deleteCategoryImage(id))
  console.log(resultAction)
  if(deleteCategoryImage.fulfilled.match(resultAction)){
    showSuccess(resultAction.payload.message || 'Image deleted successfully')
  }
  if(deleteCategoryImage.rejected.match(resultAction)){
    showError(resultAction.payload || 'Failed to delete image')
  }
  
  } 
  const handleSubmit=async(e)=>{
    e.preventDefault()
  setLoading(true)
  //input validation 
  if(!formFields.name){
    showWarning('Please enter category name')
    setLoading(false)
    return
  }
  if(categoryImages.length===0){
    showWarning('Please upload at least one image')
    setLoading(false)
    return
  }
  const resultAction = await dispatch(addCategory(formFields))
  console.log(resultAction)
  if(addCategory.fulfilled.match(resultAction)){
    showSuccess(resultAction.payload.message || 'Category added successfully')
    setLoading(false)
    setFormFields({name:''})
    dispatch(getCategories())
    setTimeout(() => {
        context.setIsAddProductModalOpen({
      open:false,
      modal:''
    })
      
    }, 1000);
    navigate('/category/list')

  
    return
  }
  if(addCategory.rejected.match(resultAction)){
    showError(resultAction.payload || 'Failed to add category')
    setLoading(false)
    return
  }

  // useEffect(()=>{
  //   if(categoryImages){
  //     console.log('upadting formfields images')
  //     setFormFields(prev=>({
  //       ...prev,
  //       images:[...prev.images,...categoryImages]
  //     }))
  //   }

  // },[categoryImages])
}
console.log(formFields)
  return (
    <section className="p-5  bg-gray-50">
      <form className="addProductForm p-3  md:p-8 py-3 "
      onSubmit={handleSubmit}
      >
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4 mb-5 md:mb-8">
          <div className="grid grid-cols-1 mb-3">
            <div className="col  w-[80%] md:w-[25%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Category Name
              </h3>
              <input
                type="text"
                name="name"
                id=""
                className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm text-sm "
                placeholder="Category Name"
                value={formFields.name}
                onChange={(e) => {
                  setFormFields({ ...formFields, name: e.target.value });
                }}
              />
            </div>
          </div>
          <br />
          <h3 className="text-[18px] font-[500] mb-1 text-black">
            Category Image
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-7 gap-2 md:gap-4 ">
         {
          categoryImages.length>0 && categoryImages.map((item,index)=>(
               <div className="uploadBoxWrapper relative">
              <span className="absolute w-[20px] h-[20px] opacity-90 rounded-full overflow-hidden bg-primary top-[-5px] right-[-5px] cursor-pointer flex items-center justify-center z-50">
                <IoIosClose onClick={()=>handleRemoveImage(item?.public_id)} className="text-white text-[19px]" />
              </span>

             
                 <div key={index} className="uploadBox p-0 rounded-md  overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors flex flex-col justify-center items-center relative">
                <LazyLoadImage
                  className="w-full h-full object-cover"
                  effect="blur"
                  wrapperProps={{
                    style: { transitionDelay: "1s" },
                  }}
                  alt={"preview"}
                  src={item?.url}
                />
              </div>
             
            </div>
          ))
         }

            <UploadBox multiple={true} onChange={handleImageChange} isUploading={isUploading} />
          </div>
        </div>
      
        <div className="w-[250px]">
          <Button type="submit" className="btn-blue md:btn-lg  md:mt-3 w-full  ">
            <IoMdCloudUpload className="text-[25px] text-white" />
            Publish and View
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddCategory;
