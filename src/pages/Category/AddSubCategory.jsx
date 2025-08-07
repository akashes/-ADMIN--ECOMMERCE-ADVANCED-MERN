import React, { useContext, useState } from 'react'

import Rating from '@mui/material/Rating';
import UploadBox from "../../components/UploadBox";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoIosClose, IoMdCloudUpload } from "react-icons/io";
import { Button } from '@mui/material';
import {Select} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { showError, showSuccess, showWarning } from '../../utils/toastUtils';
import { addCategory, getCategories } from '../../features/category/categorySlice';
import { MyContext } from '../../App';


const AddSubCategory = () => {
  const{categories}=useSelector(state=>state.category)
  const dispatch = useDispatch()
  const context = useContext(MyContext)
  const[subCatName,setSubCatName]=useState('')
 const [parentCatId, setParentCatId] = useState('');
 const[parentCatName,setParentCatName]=useState('')
 const[isLoading,setIsLoading]=useState(false)


          const handleChangeProductCat = (event) => {
            setParentCatId(event.target.value);
            const selectedCategory = categories.find((category) => category._id === event.target.value);
            setParentCatName(selectedCategory.name);
  };

  const handleSubmit=async(e)=>{
    e.preventDefault()
    //input validation 
    if(!subCatName){
      showWarning('Please enter sub category name')
      return
    }
    if(!parentCatId){
      showWarning('Please select parent category')
      return
    }
    if(!parentCatName){
      showWarning('Please select parent category')
      return
    }


      const resultAction = await dispatch(addCategory({name:subCatName,parentCatId:parentCatId,parentCatName:parentCatName}))
      console.log(resultAction)
      if(addCategory.fulfilled.match(resultAction)){
        setIsLoading(false)
        showSuccess(resultAction.payload.message || 'Category added successfully')
        setIsLoading(false)
        setSubCatName('')
        setParentCatId('')
        setParentCatName('')
        dispatch(getCategories())
        setTimeout(() => {
            context.setIsAddProductModalOpen({
          open:false,
          modal:''
        })
          
        }, 1000);
      
        return
      }
      if(addCategory.rejected.match(resultAction)){
        setIsLoading(false)
        showError(resultAction.payload || 'Failed to add category')
        setIsLoading(false)
        setSubCatName('')
        setParentCatId('')
        setParentCatName('')
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
  

  return (
    <section className="p-5  bg-gray-50">
      <form className="addProductForm  p-8 py-3 " onSubmit={handleSubmit}>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
            <div className="grid grid-cols-4 mb-3 gap-4">
               <div className="col  ">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Parent Category </h3>
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
          value={parentCatId}
          label="Product Category"
          size="small"
          className="w-full border-[rgba(0,0,0,0.1)] focus:!outline-none focus:!border-[rgba(0,0,0,0.5)] "
          onChange={handleChangeProductCat}
        >
          { categories && categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
          </div>
                <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Sub Category Name</h3>
            <input
            
              type="text"
              name="price"
              id="price"
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)]
               rounded-sm text-sm "
              placeholder="Sub Category Name"
              value={subCatName}
              onChange={(e) => setSubCatName(e.target.value)}
            />
          </div>  
        </div>
        <br />
       
    </div>
    
        <div className='w-[250px]'>

        <Button disabled={isLoading} type="submit" className="btn-blue btn-lg mt-3 w-full gap " >
            <IoMdCloudUpload className="text-[25px] text-white"/>
            Publish</Button>
        </div>


    </form>
    </section>
  )
}

export default AddSubCategory
