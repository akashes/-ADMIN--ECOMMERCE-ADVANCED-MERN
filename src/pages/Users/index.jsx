import  Button  from '@mui/material/Button'
import React, { useContext, useEffect, useState } from 'react'

import { IoIosAdd } from "react-icons/io";

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
import { RxCalendar } from "react-icons/rx";

import ProgressBar from '../../components/ProgressBar'



import { AiFillEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SearchBox from '../../components/SearchBox';


import { MdOutlineLocalPhone } from "react-icons/md";


import { MdOutlineMarkEmailRead } from "react-icons/md";
 


import { MyContext } from '../../App';
import { deleteMultipleUsers, deleteUser, getAllUsers, setPaginationPage, setPaginationPerPage } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import AlertBox from '../../components/AlertBox';
import { showError, showSuccess } from '../../utils/toastUtils';



const columns=[
  {id:'userImg',label:'USER IMAGE',minWidth:80},
  {id:'userName',label:'USER NAME',minWidth:100},
  {id:'userEmail',label:'EMAIL',minWidth:150},
  {id:'phoneNumber',label:'PHONE.NO',minWidth:100},
  {id:'createdDate',label:'CREATED DATE',minWidth:100},
  {id:'action',label:'ACTION',minWidth:100},

]
const Users = () => {
  const dispatch  = useDispatch()
    const context = useContext(MyContext)
    const{users,allUsersLoading,allUsersError,pagination}=useSelector(state=>state.user)
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
      const [page, setPage] = React.useState(0);
    
          const handleChangePage = (event, newPage) => {
    dispatch(setPaginationPage(newPage+1))
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setPaginationPerPage(+event.target.value))
    dispatch(setPaginationPage(1))
  };
  
      const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


        const handleSelectAllDelete = (checked) => {
  if (checked) {
    const ids = users.map(u => u._id);
    setDeleteArray(ids);
  } else {
    setDeleteArray([]);
  }
};

const [isAlertOpen, setIsAlertOpen] = useState(false);
const [deleteTarget, setDeleteTarget] = useState({ type: "", ids: [] });

const[isDeleting,setIsDeleting]=useState([])
const[deleteArray,setDeleteArray]=useState([])


  const handleDeleteProduct=async(id)=>{
        setIsDeleting(prev=>[...prev,id])
        const resultAction = await dispatch(deleteUser(id))
        console.log(resultAction)
        if(deleteUser.fulfilled.match(resultAction)){
          setIsDeleting([])
          showSuccess(resultAction.payload.message || 'User deleted successfully')
      }
      if(deleteUser.rejected.match(resultAction)){
        setIsDeleting([])
        showError(resultAction.payload || 'Failed to delete User')
      }
      }



       const handleDeleteMultipleUsers=async(ids)=>{
        setIsDeleting(prev=>[...prev,...ids])
        console.log(`deleting multiple products`)
        console.log(ids)
      const resultAction  = await dispatch(deleteMultipleUsers(ids))
      console.log(resultAction)
        if(deleteMultipleUsers.fulfilled.match(resultAction)){
          
          showSuccess(resultAction.payload.message || 'Users deleted successfully')
      }
      if(deleteMultipleUsers.rejected.match(resultAction)){
        showError(resultAction.payload || 'Failed to delete Users')
      }
          setIsDeleting([])


      }

       const  handleSelectMultipleDelete=(id,checked)=>{
   setDeleteArray((prev)=>{
    if(checked){
      return [...prev,id]
    }else{
      return prev.filter(pid=>pid!==id)
    }
   })
  }



const handleConfirmDelete = async () => {
  setIsAlertOpen(false);

  if (deleteTarget.type === "single") {
    await handleDeleteProduct(deleteTarget.ids[0]);
  } else if (deleteTarget.type === "multiple") {
    await handleDeleteMultipleUsers(deleteTarget.ids);
    setDeleteArray([]); // Clear selection
  }
  setDeleteTarget({type:'',ids:[]})
};
const confirmDeleteProduct = (id) => {
  setDeleteTarget({ type: "single", ids: [id] });
  setIsAlertOpen(true);
};


const confirmDeleteMultiple = () => {
  if (deleteArray.length === 0) return;
  setDeleteTarget({ type: "multiple", ids: deleteArray });
  setIsAlertOpen(true);
};


      useEffect(()=>{
        console.log('triggered getallusers')
        dispatch(getAllUsers({page:pagination.page,perPage:pagination.perPage}))

      },[pagination.page,pagination.perPage])

  return (
   <>
    
   <div className="card my-4 shadow-md sm:rounded-lg bg-white pt-5">
  
      <div className="flex flex flex-wrap items-center w-full px-5 justify-between ">
      <h2 className='text-[18px] font-[600]'>Users List </h2>
     


        
        <div className="col flex gap-2 ">
            <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
                {
               
                  deleteArray.length>0 &&   <Button  onClick={confirmDeleteMultiple} className='btn !bg-red-600 !text-white btn-sm'>Delete</Button>
                }
            
      
              </div>
              <SearchBox/>

        </div>
      
      </div>
      <br />

    <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className='bg-[#f1f1f1]'>
            <TableRow>
                 <TableCell>
                            <Checkbox checked={users.length>0 && deleteArray.length===users.length}
                            onChange={(e)=>handleSelectAllDelete(e.target.checked)}
                            {...label} size='small'/>
                              
                            
                          </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className='whitespace-nowrap font-[600] text-[14px]'
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
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
            {
              users?.length>0 && users.map((user)=>{
                console.log(user)
                return(
                        <TableRow  className={`${isDeleting.includes(user._id) && 'uploading-gradient-delete'}`} key={user._id} >
                <TableCell style={{minWidth:columns.minWidth}}>
                              <Checkbox checked={deleteArray.includes(user._id)} onChange={(e)=>handleSelectMultipleDelete(user._id,e.target.checked)} {...label} size='small'/>
              
                            </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <div className="flex items-center gap-4 w-[70px]"><div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                  <Link to='/'>
                <img alt="" className="w-full group-hover:scale-105 transition-transform" src={user.avatar?.url}/>
                  </Link>
              
                </div>
              
                </div>

              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                 {user.name}
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <div className="flex items-center gap-2">

                <MdOutlineMarkEmailRead />
                  {user.email}
                </div>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <div className="flex items-center gap-2">

                <MdOutlineLocalPhone className='text-[20px]'/>
              {user?.mobile}
                </div>
                         </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <div className="flex items-center gap-2">
                    <RxCalendar className='text-[22px]'/>
                 {user.createdAt.split('T')[0]}
                </div>
                         </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>

              <TooltipMUI placement='top' title='Delete User'>
        
              <Button 
              // onClick={()=>handleDeleteProduct(product._id)}
              onClick={()=>confirmDeleteProduct(user._id)}
              className='!w-[45px] !h-[45px]  bg-[#f1f1f1] !min-w-[45px]  !border !border-[rgba(0,0,0,0.1)] !rounded-sm hover:!bg-[#f1f1f1] hover:!shadow-sm hover:scale-110'>
        
                 <img width={28} src="https://res.cloudinary.com/dllelmzim/image/upload/v1756700295/delete_1_euxpxo.png" alt="" />
              </Button>
              </TooltipMUI>
                         </TableCell>
            
        
             
        
            </TableRow>

                )
              })
            }
      
      
        
       
          </TableBody>
        </Table>
      </TableContainer>
<TablePagination
  rowsPerPageOptions={[2, 4, 5]}
  component="div"
  count={pagination.totalUsers}  
  rowsPerPage={pagination.perPage}
  page={pagination.page - 1}     
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>




        

   </div> 
      <AlertBox
     open={isAlertOpen}
     onClose={() => {
       setIsAlertOpen(false)
       setDeleteArray([])
       setDeleteTarget({type:'',ids:[]})
     }}
     onConfirm={handleConfirmDelete}
     title={deleteTarget.type === "multiple" ? "Delete Multiple Users" : "Delete User"}
     description={
       deleteTarget.type === "multiple"
         ? `Are you sure you want to delete all selected (${deleteArray.length}) Users? This action cannot be undone.`
         : "Are you sure you want to delete this User? This action cannot be undone."
     }
   />
   </>
  )
}

export default Users
