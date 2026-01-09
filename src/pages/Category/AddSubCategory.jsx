import React, { useContext, useState } from 'react'


import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoIosClose, IoMdCloudUpload } from "react-icons/io";
import { Button } from '@mui/material';
import {Select} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { showError, showSuccess, showWarning } from '../../utils/toastUtils';
import { addCategory, getCategories } from '../../features/category/categorySlice';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';


const AddSubCategory = () => {
  const{categories}=useSelector(state=>state.category)
  const dispatch = useDispatch()
  const navigate  = useNavigate()
  const context = useContext(MyContext)
  const[subCatName,setSubCatName]=useState('')
 const [parentCatId, setParentCatId] = useState('');
 const[parentCatName,setParentCatName]=useState('')
 const[subCatId,setSubCatId]=useState('')
 const[thirdCatName,setThirdCatName]=useState('')
 const[isLoading,setIsLoading]=useState(false)
 const[isLoading2,setIsLoading2]=useState(false)


          const handleChangeProductCat = (event) => {
            setParentCatId(event.target.value);
            setSubCatId('')
            const selectedCategory = categories.find((category) => category._id === event.target.value);
            setParentCatName(selectedCategory.name);
  };
  const handleChangeSubCat=(event)=>{
    setSubCatId(event.target.value)

  }
  const selectedRootCategory = categories.find((category) => category._id === parentCatId);
const subCategories = selectedRootCategory?.children || [];
const selectedSubCategory = subCategories.find((category) => category._id === subCatId);

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
        showSuccess(resultAction.payload.message || 'Sub Category added successfully')
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
        navigate('/subCategory/list')
      
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
    
   


  }
  const handleSubmitThirdLevelCategory=async(e)=>{
    e.preventDefault()
    //input validation 
    if(!thirdCatName){
      showWarning('Please enter sub category name')
      return
    }
    if(!parentCatId){
      showWarning('Please select parent category')
      return
    }

    if(!subCatId){
      showWarning('Please select sub category')
      return
    }
    if(!selectedSubCategory?.name){
      showWarning('Please select sub category')
      return
    }
    setIsLoading2(true)
    const resultAction = await dispatch(addCategory({name:thirdCatName,parentCatId:subCatId,parentCatName:selectedSubCategory?.name}))
    console.log(resultAction)
    if(addCategory.fulfilled.match(resultAction)){
      setIsLoading2(false)
      showSuccess(resultAction.payload.message || 'Third level Category added successfully')
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
      navigate('/subCategory/list')
    
      return
    }
    if(addCategory.rejected.match(resultAction)){
      setIsLoading2(false)
      showError(resultAction.payload || 'Failed to add category')
      setIsLoading2(false)
      setSubCatName('')
      setParentCatId('')
      setParentCatName('')
      return
    }


  }


  return (
    <section className=" p-1  md:p-5 w-[100%]  md:w-[50%]  bg-gray-50 grid grid-cols-1  gap-5 md:gap-10">
      <form className="addProductForm  p-8 py-3 " onSubmit={handleSubmit}>
        <h3 className='font-bold'>Add Sub Category</h3>
        <div className="scroll max-h-[72vh] overflow-y-scroll  pt-4">
            <div className="grid grid-cols-2 mb-3 gap-4">
               <div className="col  ">
            <h3 className="text-[14px] font-[500] mb-1 text-black text-nowrap">Parent Category </h3>
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
          // value={parentCatId}
          renderValue={(selected) => {
    const selectedCategory = categories.find(cat => cat._id === selected);
    return selectedCategory ? selectedCategory.name : '';
  }}
          label="Product Category"
          size="small"
          className="w-full border-[rgba(0,0,0,0.1)] focus:!outline-none focus:!border-[rgba(0,0,0,0.5)] "
          onChange={handleChangeProductCat}
        >
          { categories && categories.map((category) => (
            <MenuItem className='!flex !justify-between' key={category._id} value={category._id}>
              {category.name}
              <img src={category?.images[0].url} alt="" width={20} />
            </MenuItem>
          ))}
        </Select>
          </div>
                <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black text-nowrap">Sub Category Name</h3>
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
    
        <div className='w-full'>

        <Button disabled={isLoading} type="submit" className="btn-blue btn-lg mt-3 w-full gap-2 " >
            <IoMdCloudUpload className="text-[25px] text-white"/>
            {isLoading ? 'Adding..': 'Add Sub Category'}
            </Button>
        </div>


    </form>





     <form className="addProductForm  p-8 py-3 " onSubmit={handleSubmitThirdLevelCategory}>
      <h3 className='font-bold'>Add Third Level Category</h3>
        <div className="scroll max-h-[72vh] overflow-y-scroll  pt-4">
            <div className="grid grid-cols-2 mb-3 gap-4">
               <div className="col  ">
            <h3 className="text-[14px] font-[500] mb-1 text-black text-nowrap">Parent Sub Category </h3>
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
          value={subCatId}
          label="Product Category"
          size="small"
          disabled={subCategories.length===0  }
          className="w-full border-[rgba(0,0,0,0.1)] focus:!outline-none focus:!border-[rgba(0,0,0,0.5)] "
          onChange={handleChangeSubCat}
        >
          { subCategories.length>0 && subCategories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
          </div>
                <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black text-nowrap">Third Level Category</h3>
            <input
            
              type="text"
              name="thirdCatName"
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)]
               rounded-sm text-sm "
              placeholder="Third Level Category Name"
              value={thirdCatName}
              onChange={(e) => setThirdCatName(e.target.value)}
            />
          </div>  
        </div>
        <br />
       
    </div>
    
        <div className='w-full'>

        <Button disabled={isLoading} type="submit" className="btn-blue btn-lg mt-3 w-full gap-1 text-nowrap  " >
            <IoMdCloudUpload className="text-[25px] text-white"/>
            {isLoading2 ? 'Adding..': 'Add Third Level Sub Category'}</Button>
        </div>


    </form>
    </section>
  )
}

export default AddSubCategory
