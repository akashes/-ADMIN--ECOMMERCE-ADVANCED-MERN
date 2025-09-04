import React, { useEffect, useState } from "react";

import Rating from "@mui/material/Rating";
import UploadBox from "../../components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoIosClose, IoMdCloudUpload } from "react-icons/io";
import { Button, CircularProgress } from "@mui/material";
import {  showError, showSuccess, showWarning } from "../../utils/toastUtils";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { createBlog, getAllBlogs } from "../../features/blog/blogSlice";

import Editor from 'react-simple-wysiwyg';


const AddBlog = () => {
      const [html, setHtml] = useState('');


  const context = useContext(MyContext)
  const navigate = useNavigate()
  const[loading,setLoading] = useState(false)
  const[isUploading,setIsUploading] = useState(false)
  const dispatch = useDispatch()

  const[image,setImage]=useState(null)
  const[file,setFile]=useState(null)
  const [formFields, setFormFields] = useState({
    title:"",
    description:""

  });

  const onChangeDescription=(e)=>{
    setHtml(e.target.value)
    setFormFields((prev)=>({...prev,description:e.target.value}))
  }


function isBannerSizeValid(width, height) {
  const aspectRatio = width / height;
  return (
    width >= 600 &&   
    width <= 2000 &&  
    height >= 400 &&
    height <= 1500 &&
    aspectRatio >= 1.4 &&  
    aspectRatio <= 1.6
  );
}


    const handleImageChange = (e) => {
      console.log(e.target.files)
    setIsUploading(true)

    const selectedFile = e.target.files[0];
    if(!selectedFile)
        {
            setIsUploading(false)
            return
        } 

      const validTypes = ['image/jpeg', 'image/png', 'image/webp','image/jpg'];
  if (!validTypes.includes(selectedFile.type)) {
    showError('Only JPEG, PNG, or WEBP images are allowed');
    setIsUploading(false)
    return;
  }
  const maxSizeMB = 4;
  if (selectedFile.size > maxSizeMB * 1024 * 1024) {
    showError(`Image must be less than ${maxSizeMB}MB`);
    setIsUploading(false)
    return;
  }

    const img = new Image();
  img.src = URL.createObjectURL(selectedFile);
  img.onload = () => {
    const width = img.width;
    const height = img.height;
   const valid = isBannerSizeValid(width,height)
   if(!valid){
    showWarning('Image ratio is not Valid, Please upload another Image')
    setIsUploading(false)
    return
   }
    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile));
    setIsUploading(false)
  };
  

    
  };

  // Remove image
  const handleRemoveImage = () => {
    setImage(null);
    setFile(null);
      const fileInput = document.querySelector('input[type="file"]');
  if (fileInput) fileInput.value = "";
  };
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(!formFields.title || !formFields.description){
        showWarning('Title and description are needed')
    }
    if(!file){
      showWarning('Please Upload Blog Image ')
      return
    }

    const formData = new FormData()
    formData.append('image',file)
    formData.append('title',formFields.title)
    formData.append('description',formFields.description)


    setLoading(true)
   const resultAction = await dispatch(createBlog(formData))
   console.log(resultAction)
    if(createBlog.fulfilled.match(resultAction)){
        setLoading(false)
      setFile(null)
      setImage(null)
             showSuccess(resultAction.payload.message || 'Blog Added successfully')
             setTimeout(() => {
              
               context.setIsAddProductModalOpen(prev=>({
                ...prev,
                open:false,
                modal:'',
               }))
              },300);
              
              navigate('/blog/list')
              dispatch(getAllBlogs())

           }
           if(createBlog.rejected.match(resultAction)){
            setLoading(false)
             showError(resultAction.payload || 'Failed to Add Blog')
           }
   
  

    
    
  }

console.log(formFields)
  return (
    <section className="p-5  bg-gray-50">
      <form className="addProductForm  p-3 md:px-20 py-3 "
      onSubmit={handleSubmit}
      >
        <div className=" overflow-y-scroll md:pr-4 pt-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Blog Title
              </h3>
              <input
                type="text"
                name="title"
                id=""
                className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm text-sm "
                placeholder="Blog Title"
                value={formFields.title}
                onChange={(e) => {
                  setFormFields({ ...formFields, title: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 mb-3">
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Description
              </h3>
                  <Editor   containerProps={{ style: { resize: 'vertical' } }}
  value={html} onChange={onChangeDescription} />
        
            </div>
          </div>
          <br />
          <h3 className="text-[18px] font-[500] mb-1 text-black">
            Blog Image
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-7 gap-2 md:gap-4 ">
         {
            image && (

               <div className="uploadBoxWrapper relative">
              <span className="absolute w-[20px] h-[20px] opacity-90 rounded-full overflow-hidden bg-primary top-[-5px] right-[-5px] cursor-pointer flex items-center justify-center z-50">
                <IoIosClose onClick={handleRemoveImage} className="text-white text-[19px]" />
              </span>

             
                 <div  className="uploadBox p-0 rounded-md  overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors flex flex-col justify-center items-center relative">
                <LazyLoadImage
                  className="w-full h-full object-cover"
                  effect="blur"
                  wrapperProps={{
                    style: { transitionDelay: "1s" },
                  }}
                  alt={"preview"}
                  src={image}
                />
              </div>
             
            </div>
            )

         }

            <UploadBox multiple={true} onChange={handleImageChange} isUploading={isUploading} />
          </div>
        </div>
        <br />
        <br />
        <div className=" w-full  md:w-[250px]">
          <Button disabled={loading || isUploading} type="submit" className={`btn-blue md:btn-lg mt-1 md:mt-3 w-full gap-2 ${loading || isUploading && 'opacity-80'}`}>
            {
                loading ? (
                    <>
                    
                    <CircularProgress size={20} className=" !text-white" /> Adding Blog
                    </>
                ):(
                    <>
                     <IoMdCloudUpload className="text-[25px] text-white" />
        
            Add Blog
                    </>
                )
            }
           
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddBlog;
