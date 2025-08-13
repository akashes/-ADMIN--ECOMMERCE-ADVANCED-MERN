import  Button  from '@mui/material/Button'
import React, { useContext, useEffect, useState } from 'react'


import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import TooltipMUI from '@mui/material/Tooltip';


import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { AiFillEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



import { MyContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategories, setEditSelectedCategory } from '../../features/category/categorySlice';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { showError, showSuccess } from '../../utils/toastUtils.js';
import DeleteWarningDialog from '../../components/DeleteWarningDialog.jsx';


const columns=[
  {id:'Image',label:'IMAGE',minWidth:150},
  {id:'catName',label:'CATEGORY NAME',minWidth:150},
  {id:'action',label:'ACTION',minWidth:100},

]
const CategoryList = () => {
    const context = useContext(MyContext)
    const{categories}=useSelector(state=>state.category)
    const dispatch = useDispatch()
    const[deleteCategoryId,setDeleteCategoryId]=useState('')
    const[deleteCategoryName,setDeleteCategoryName]=useState('')

     const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

      const [rowsPerPage, setRowsPerPage] = React.useState(10);
      const [page, setPage] = React.useState(0);
        const [categoryFilterVal, setCategoryFilterVal] = useState('');
    
          const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
      const handleChangeCatFilter = (event) => {
        setCategoryFilterVal(event.target.value);
      };
      const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

      const handleDeleteCategory=async()=>{
        handleClose()
        const resultAction = await dispatch(deleteCategory(deleteCategoryId))
        console.log(resultAction)
        if(deleteCategory.fulfilled.match(resultAction)){
          showSuccess(resultAction.payload.message || 'Category deleted successfully')
          dispatch(getCategories())
        }
        if(deleteCategory.rejected.match(resultAction)){
          showError(resultAction.payload || 'Failed to delete category')
        }



      }
      useEffect(()=>{

        const fetchCategoriesFunction=async()=>{

          const resultAction = await dispatch(getCategories())
          console.log(resultAction)
       

        }
        fetchCategoriesFunction()


      },[])
      console.log(categories)
      const paginatedCategories = categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  return (
   <>
   {/* welcome banner */}
     <div className="flex items-center justify-between px-2 py-0 mt-3">
      <h2 className='text-[18px] font-[600]'>Category List  </h2>
        <div className="col w-[30%] ml-auto flex items-center justify-end gap-3">
          <Button className='btn-blue btn-sm '
                onClick={()=>context.setIsAddProductModalOpen({open:true,modal:'Add New Category'})}

          > Add Category</Button>

        </div>
    </div>
   <div className="card my-4 shadow-md sm:rounded-lg bg-white pt-5">
  
   

    <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className='bg-[#f1f1f1]'>
            <TableRow>
              <TableCell width={columns} >
                <Checkbox {...label} size='small'/>
                
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  width={column.minWidth}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              paginatedCategories.length>0 && paginatedCategories.map((item)=>(
                  <TableRow >
              <TableCell 
              width={60}
              >
                <Checkbox {...label} size='small'/>

              </TableCell>
              <TableCell 
              width={100}
              
              >
                <div className="flex items-center gap-4">
                  <div className="img w-[80px] h-auto rounded-md overflow-hidden group">
                  <Link to='/'>

                     <LazyLoadImage
                                    className="w-full h-full object-cover  group-hover:scale-105 transition-transform"
                                    effect="blur"
                                    wrapperProps={{
                                      style: { transitionDelay: "1s" },
                                    }}
                                    alt={"preview"}
                                    src={item.images[0].url}

                                  />
                  </Link>
              
                </div>
               
                </div>

              </TableCell>
                  <TableCell 
              width={100}
              >
               {item.name}
              </TableCell>
          

              <TableCell
              width={100}
              >
                   <div className="flex items-center gap-1">
      <TooltipMUI placement='top' title='Edit Product'>

      <Button
      onClick={()=>{
        dispatch(setEditSelectedCategory(item))
        context.setIsAddProductModalOpen({open:true,modal:'Edit Category'})
      }}
       className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !min-w-[35px]  !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] hover:!shadow-sm hover:scale-110'>

        <AiFillEdit className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
      </Button>

      
      </TooltipMUI>
      <TooltipMUI placement='top' title='View Product details'>

      <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !min-w-[35px]  !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] hover:!shadow-sm hover:scale-110'>

        <FaEye className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
      </Button>
      </TooltipMUI>
      <TooltipMUI placement='top' title='Remove Product'>

      <Button
      // onClick={()=>confirmDelete(item._id,item.name)}
      onClick={()=>{
        setDeleteCategoryId(item._id)
        setDeleteCategoryName(item.name)
        handleClickOpen()
        
      }}
       className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !min-w-[35px]  !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] hover:!shadow-sm hover:scale-110'>

        <MdDelete className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
      </Button>
      </TooltipMUI>
    </div>
              </TableCell>
        
            </TableRow>
              ))
            }
            {/* <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
              {
                columns.map((column)=>{
                  const value=row(column.id)
                  return(
                    <TableCell key={column.id} align={column.align} >
                      {column.format && typeof value==='number' ? column.format(value):value}
                    </TableCell>
                  )
                })
              }

            </TableRow> */}
          
          
         
       
   

          
          </TableBody>
        </Table>
      </TableContainer>
       <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />



        

   </div> 
     {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this category?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting this category also deletes all the products under this category as well its subcategories

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
          className='!bg-black !text-white btn-md'
          onClick={()=>{
            handleClose()
            setDeleteCategoryId(null)
          }}>Close</Button>
          <Button className='!bg-secondary !text-white !btn-sm' onClick={handleDeleteCategory} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog> */}
      <DeleteWarningDialog
       open={open} handleClose={handleClose} 
       setDeleteId={setDeleteCategoryId}
        deleteFunction={handleDeleteCategory}
        title={'Do you want to delete category'}
        categoryName={deleteCategoryName}
        content={'Deleting this category also deletes all the products under this category as well its subcategories'}
        />
   </>
  )
}

export default CategoryList
