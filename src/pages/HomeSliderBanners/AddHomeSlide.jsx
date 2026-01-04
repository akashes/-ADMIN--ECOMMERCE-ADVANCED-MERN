import React, { useContext, useState } from 'react'

import Rating from '@mui/material/Rating';
import UploadBox from "../../components/UploadBox";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoIosClose, IoMdCloudUpload, IoMdInformationCircleOutline } from "react-icons/io";
import { Alert, Button, Tooltip } from '@mui/material';
import { showError, showSuccess, showWarning } from '../../utils/toastUtils';
import { useDispatch } from 'react-redux';
import { addHomeSlide, getHomeSlides } from '../../features/homeSlide/homeSlide';
import { MyContext } from '../../App';
import { LiaImages } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';




const AddHomeSlide = () => {
  const[isUploading,setIsUploading]=useState('')
  const[image,setImage]=useState(null) //preview
  const[file,setFile]=useState(null)
  const dispatch = useDispatch()
  const context = useContext(MyContext)
  const navigate = useNavigate()

  function isBannerSizeValid(width, height) {
  const aspectRatio = width / height;
  return (
    width >= 1300 &&
    width <= 2000 &&
    height >= 380 &&
    height <= 600 &&
    aspectRatio >= 3.2 &&
    aspectRatio <= 3.5
  );
}

    const handleImageChange = (e) => {
      console.log(e.target.files)
    const selectedFile = e.target.files[0];
    if(!selectedFile) return

      const validTypes = ['image/jpeg', 'image/png', 'image/webp','image/jpg'];
  if (!validTypes.includes(selectedFile.type)) {
    showError('Only JPEG, PNG, or WEBP images are allowed');
    return;
  }
  const maxSizeMB = 4;
  if (selectedFile.size > maxSizeMB * 1024 * 1024) {
    showError(`Image must be less than ${maxSizeMB}MB`);
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
    return
   }
    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile));
  };
  

    
  };

  // Remove image
  const handleRemoveImage = () => {
    setImage(null);
    setFile(null);
  };
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(!file){
      showWarning('Please Upload HomeSlide before Submitting')
      return
    }

    const formData = new FormData()
    formData.append('image',file)

    setIsUploading(true)
   const resultAction = await dispatch(addHomeSlide(formData))
   console.log(resultAction)
    if(addHomeSlide.fulfilled.match(resultAction)){
      setIsUploading(false)
      setFile(null)
      setImage(null)
             showSuccess(resultAction.payload.message || 'Home Slide Added successfully')
             setTimeout(() => {
              
               context.setIsAddProductModalOpen({
                 open:false,
                 modal:'',
                 id:''
                })
              }, 300);
              
              navigate('/homeSlider/list')
              dispatch(getHomeSlides())

           }
           if(addHomeSlide.rejected.match(resultAction)){
            setIsUploading(false)
             showError(resultAction.payload || 'Failed to Add Home-Slide')
           }
   
  

    
    
  }


  
//        const handleImageChange=async(e)=>{

//           const filesArray=Array.from(e.target.files)
          
//           if(filesArray.length===0) return;

//        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

//           const allValid = filesArray.every((file) =>
//             validTypes.includes(file.type)
//           );

//           if (!allValid) {
//             showError('Please select valid image files');
//             return;
//           }

//           console.log('valid image types');
//           setIsUploading(true)
//           try {
//                const formData = new FormData()
//                filesArray.forEach((file)=>formData.append('categoryImages',file))
  
      
//           console.log('calling with formdata',formData)
//           const resultAction = await dispatch( addCategoryImage(formData))
//           console.log(resultAction)
//          if(addCategoryImage.fulfilled.match(resultAction)){
//              showSuccess('image uploaded successfully')

       
//          }
//          if(addCategoryImage.rejected.match(resultAction)){
//              showError(resultAction.payload || 'Failed to upload image')
//          }
              
//           } catch (error) {
//               console.log('upload error',error.response?.data || error.message)
//               showError(error.response?.data?.message || error.message)
//           }finally{
//               setIsUploading(false)
//           }
          
         
       
//       }
//   const handleRemoveImage=async(id)=>{
//   const resultAction=  await dispatch(deleteCategoryImage(id))
//   console.log(resultAction)
//   if(deleteCategoryImage.fulfilled.match(resultAction)){
//     showSuccess(resultAction.payload.message || 'Image deleted successfully')
//   }
//   if(deleteCategoryImage.rejected.match(resultAction)){
//     showError(resultAction.payload || 'Failed to delete image')
//   }
  
//   } 
//   const handleSubmit=async(e)=>{
//     e.preventDefault()
//   setLoading(true)
//   //input validation 
//   if(!formFields.name){
//     showWarning('Please enter category name')
//     setLoading(false)
//     return
//   }
//   if(categoryImages.length===0){
//     showWarning('Please upload at least one image')
//     setLoading(false)
//     return
//   }
//   const resultAction = await dispatch(addCategory(formFields))
//   console.log(resultAction)
//   if(addCategory.fulfilled.match(resultAction)){
//     showSuccess(resultAction.payload.message || 'Category added successfully')
//     setLoading(false)
//     setFormFields({name:''})
//     dispatch(getCategories())
//     setTimeout(() => {
//         context.setIsAddProductModalOpen({
//       open:false,
//       modal:''
//     })
      
//     }, 1000);
//     navigate('/category/list')

  
//     return
//   }
//   if(addCategory.rejected.match(resultAction)){
//     showError(resultAction.payload || 'Failed to add category')
//     setLoading(false)
//     return
//   }


// }
  return (
    <section className="p-5  bg-gray-50">
      <form className="addProductForm p-3 md:p-8 py-1 md:py-3 " onSubmit={handleSubmit}>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {
                  image && 
                    <div className="uploadBoxWrapper relative">
                                <span className="absolute w-[20px] h-[20px] opacity-90 rounded-full overflow-hidden bg-primary top-[-5px] right-[-5px] cursor-pointer flex items-center justify-center z-50">
                                    <IoIosClose onClick={handleRemoveImage} className="text-white text-[19px]" />
                                </span>
                                
                         <div className='uploadBox p-0 rounded-md  overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors flex flex-col justify-center items-center relative'>
            
                                 <LazyLoadImage
                                 className="w-full h-full object-cover"
                                 effect="blur"
                                     wrapperProps={{
                               style: {transitionDelay: "1s"},
                }}
            
                  alt={"image"}
                                        src={image}
                                        />
                            </div>
                             </div>
                }
                           
                          
            

                            <UploadBox multiple={false} isUploading={isUploading} onChange={handleImageChange} />
                        </div>
    </div>
        <br /> 
        <br /> 
        <div className='w-[250px]'>

        <Button disabled={isUploading} type="submit" className={`btn-blue btn-lg mt-3 w-full gap-2 ${isUploading && 'opacity-70'}`} >
          <LiaImages  className='text-[20px]' />
          {
            isUploading? "Adding Home Slide..":"Add Home Slide"
          }
            
            </Button>
        </div>


    </form>
    {
      !file &&  <Alert
       className=' ml-3 md:!ml-8 mt-5'
      severity="info"
      icon={<IoMdInformationCircleOutline size={22} />}
      sx={{
        mb: 2,
        borderRadius: 2,
        fontSize: "0.9rem",
        width:`${window.innerWidth<992?"300px":"500px"}`,
        bgcolor: "rgba(33, 150, 243, 0.08)",
      }}
    >
      Banner image must be:
      <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
        <li>Width: 1300px – 2000px</li>
        <li>Height: 380px – 600px</li>
        <li>Aspect ratio: between 3.2 and 3.5</li>
        <li>Only one banner can be uploaded at a time</li>
      </ul>
    </Alert>
    }
      
    </section>
    
  )
}

export default AddHomeSlide
