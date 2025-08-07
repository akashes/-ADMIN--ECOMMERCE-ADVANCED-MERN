import { Button, CircularProgress, MenuItem, Select } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { MdOutlineModeEdit } from 'react-icons/md'
import { showSuccess, showWarning } from '../../utils/toastUtils'
import { useDispatch } from 'react-redux'
import { deleteCategory, getCategories, updateSubCategory } from '../../features/category/categorySlice'
import { MyContext } from '../../App'

const EditSubCatBox = (props) => {
    const dispatch = useDispatch()
    const context = useContext(MyContext)
    const [editMode,setEditMode]=useState(false)
    const[isLoading,setIsLoading]=useState(false)
    const [selectedVal,setSelectedVal]=useState('')
    const[formFields,setFormFields]=useState({
        name:'',
        id:'',
        parentCatName:'',
        parentCatId:''
    })
    console.log(formFields)
    console.log(selectedVal)
    const onChangeInput=(e)=>{
        const{name,value}=e.target
        setFormFields({
            ...formFields,
            [name]:value
        })
    }

  const handleChange = (event) => {
    const selectedId = event.target.value;
    setSelectedVal(selectedId);

    const selectedCategory = props.catData.find(cat => cat._id === selectedId);
    
    setFormFields({
        ...formFields,
        parentCatId: selectedId,
        parentCatName: selectedCategory?.name || ''
    });
};


      const handleSubmit=async(e)=>{
        e.preventDefault()

        if(formFields.name===''){
            showWarning('Please enter category name')
            return false
        }
        if(formFields.parentCatId===''){
            showWarning('Please select parent category')
            return false
        }
        const resultAction = await dispatch(updateSubCategory(formFields))
        console.log(resultAction)
        if(updateSubCategory.fulfilled.match(resultAction)){
            setEditMode(false)
            showSuccess(resultAction.payload.message || 'updated successfully',2000,'bottom-center')
            setIsLoading(false)
            setFormFields({name:''})
            dispatch(getCategories())
            setTimeout(() => {
                context.setIsAddProductModalOpen({
              open:false,
              modal:''
            })
              }, 1000);
            return true

      }
      if(updateSubCategory.rejected.match(resultAction)){
        showWarning(resultAction.payload.message || 'something went wrong')
        setIsLoading(false)
        return false
      }
    }

    const handleDelete=async()=>{
        const resultAction = await dispatch(deleteCategory(formFields.id))
        if(deleteCategory.fulfilled.match(resultAction)){
            showSuccess(resultAction.payload.message || 'deleted successfully')
            dispatch(getCategories())
            return true
        }
        if(deleteCategory.rejected.match(resultAction)){
            showWarning(resultAction.payload.message || 'something went wrong')
            return false
        }
    }

      useEffect(()=>{
        setFormFields({
            name:props?.name, //name
            id:props?.id,
            parentCatName:props?.selectedCatName,//parentCatName
            parentCatId:props?.selectedCat, //parentId
        })
        setSelectedVal(props?.selectedCat) //parentId

      },[props?.name, props?.id, props?.selectedCat, props?.selectedCatName])
  return (
   <form className='w-full flex items-center  gap-3 p-0 px-4' onSubmit={handleSubmit} >
    {
        editMode===true &&
         <>
         <div className="flex itc justify-between py-2 gap-4">
            <div className='w-[150px]'>
                <Select 
                className='w-full'
                size='small'
                style={{zoom:'75%'}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedVal}
                label="Name"
                onChange={handleChange}
                inputProps={{ 'aria-label': 'Without label' }}
                >
                   {
                    props.catData?.length!==0 && props.catData?.map((item,index)=>{
                        return(
                            <MenuItem key={index} value={item?._id}  >
                            {item?.name}
                            </MenuItem>
                        )
                    })
                    }
                   
                
                </Select>

            </div>
            <input type="text" className='w-full h-[30px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm 
            p-3 text-sm 
            ' name='name' value={formFields.name} onChange={onChangeInput} />

            <div className='flex items-center gap-2'>
                <Button size='small' className='btn-sml' type='submit' variant='contained' >
                    {
                        isLoading===true?<CircularProgress color='inherit' size={20} />
                        :
                        'Edit'
                    }
                    
                </Button>
                <Button size='small' variant='outlined' onClick={()=>setEditMode(false)}>Cancel</Button>

            </div>
         </div>
        
        </>
    }
    {
        editMode===false &&  
     <>
        <span className='font-[500] text-[14px]'>{props?.name}</span>
           <div className='flex items-center ml-auto gap-2'>
        <Button className='!min-w-[35px] !h-[35px] !w-[35px] !rounded-full !text-black'
        onClick={()=>
        {
            setEditMode(true)
            setSelectedVal(props?.name)

        }
    }
        ><MdOutlineModeEdit/></Button>

        <Button
        onClick={handleDelete}
        className='!min-w-[35px] !h-[35px] !w-[35px] !rounded-full !text-black'
    
        ><FaRegTrashAlt/></Button>

    </div>
     </>
    }
 
   </form>
  )
}

export default EditSubCatBox
