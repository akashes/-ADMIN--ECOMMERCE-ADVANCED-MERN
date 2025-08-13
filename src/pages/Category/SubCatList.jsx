import React, { useContext, useState } from 'react'

import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';





import { MyContext } from '../../App';
import { useSelector } from 'react-redux';
import { FaAngleDown } from 'react-icons/fa6';
import EditSubCatBox from './EditSubCatBox';
import DeleteWarningDialog from '../../components/DeleteWarningDialog';




const SubCategoryList = () => {




  const[open,setOpen]=useState(-1)

  const expandCategory=(index)=>{

    if(open===index){
      setOpen(-1)
    }else{
      setOpen(index)
    }
    

  }
    const context = useContext(MyContext)
    const {categories}=useSelector(state=>state.category)


  return (
   <>
   {/* welcome banner */}
     <div className="flex items-center justify-between px-2 py-0 mt-3">
      <h2 className='text-[18px] font-[600]'>Category List  </h2>
        <div className="col w-[30%] ml-auto flex items-center justify-end gap-3">
          <Button className='btn-blue btn-sm '
                onClick={()=>context.setIsAddProductModalOpen({open:true,modal:'Add New Sub Category'})}

          > Add New Sub-Category</Button>

        </div>
    </div>
    <div className="card my-4 pt-5 pb-5 px-5 shadow-md sm:rounded-lg bg-white">
      <ul className="w-full">


        {
          categories.length>0 && categories.map((category,index)=>{
            return(
              <li className='w-full  mb-1' key={index}>
              <div className='flex items-center w-full p-2 bg-[#f1faff] rounded-sm px-4'>
                <span className='font-[500] flex items-center gap-4 text-[14px]'>{category.name}</span>
                {
                  category.children.length!==0 &&   <Button onClick={()=>expandCategory(index)} className='!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto'>
                  <FaAngleDown/>
                </Button>
                }
              


              </div>
              {
                open===index && 
                <>
               {
                category?.children?.length>0 && 
                <ul className='w-full'>
                  {
                    category?.children?.map((subCat,index)=>{
                      return(
                        <li className='w-full py-1   ' key={index}>
                          <EditSubCatBox name={subCat.name} id={subCat._id} catData={categories} index={index}  selectedCat={subCat?.parentCatId} selectedCatName={subCat?.parentCatName} />
                          
                          {/* third level */}
                          {subCat?.children?.length>0 && 
                          <ul className='pl-4'>
                            {
                              subCat?.children?.map((thirdSubCat,index)=>{
                                return(
                                  <li className='w-full py-1 bg-white  ' key={index}>
                                    <EditSubCatBox name={thirdSubCat.name} id={thirdSubCat._id} catData={category.children} index={index}  selectedCat={thirdSubCat?.parentCatId} selectedCatName={thirdSubCat?.parentCatName} />
                                  </li>
                                )
                              })
                            }

                          </ul>  }
                        </li>
                      )
                    })
                  }

                </ul>
               }
                </>
              }
              </li>
            )
          })
        }

      </ul>


    </div>
      
   
   </>
  )
}

export default SubCategoryList
