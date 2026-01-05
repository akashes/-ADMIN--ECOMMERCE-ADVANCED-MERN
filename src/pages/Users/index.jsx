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

import { Skeleton } from "@mui/material";

import SearchBox from '../../components/SearchBox';


import { MdOutlineLocalPhone } from "react-icons/md";


import { MdOutlineMarkEmailRead } from "react-icons/md";
 


import { MyContext } from '../../App';
import { deleteMultipleUsers, deleteUser, getAllUsers, setPaginationPage, setPaginationPerPage, updateUserRoles, updateUserStatus } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import AlertBox from '../../components/AlertBox';
import { showError, showSuccess } from '../../utils/toastUtils';
import { Chip, MenuItem, Select } from '@mui/material';
import useDebounce from '../../hooks/useDebounce';



const columns=[
  {id:'USER',label:'USER',minWidth:80},

  {id:'phoneNumber',label:'PHONE.NO',minWidth:100},
  {id:'createdDate',label:'CREATED DATE',minWidth:100},
  {id:'roles',label:'ROLES',minWidth:200},
  {id:'update-role',label:'UPDATE ROLES',minWidth:50},
  {id:'manage-user',label:'USER-STATUS',minWidth:100},
  {id:'delete',label:'DELETE USER',minWidth:100},

]
const getStatusChip = (status) => {
  const colorMap = {
    USER: { label: "user", color: "info",padding:1 },
    MODERATOR: { label: "moderator", color: "warning",padding:1.2 },
    ADMIN: { label: "admin", color: "success",padding:1.5 },
    "SUPER-ADMIN": { label: "super admin", color: "error" ,padding:1.7},

  };

  const { label, color,padding } = colorMap[status] || { label: status, color: "default" };
  return <Chip  label={label} color={color} size="small"   className='!rounded-full'   sx={{ fontWeight: "bold", p: padding }}
/>;
};
const Users = () => {
  const dispatch  = useDispatch()
    const context = useContext(MyContext)
    const{users,allUsersLoading,allUsersError,pagination}=useSelector(state=>state.user)
       const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
    const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
    
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

//update user roles : admin/super-admin,user etc
const handleUpdateRoles = async (userId, updatedRoles) => {
  const resultAction = await dispatch(updateUserRoles({ userId, role: updatedRoles }));

  if (updateUserRoles.fulfilled.match(resultAction)) {
    showSuccess("Roles updated successfully");
  } else {
    showError(resultAction.payload || 'Failed to update user role');
  }
};

//update status , active/inactive
const handleUpdateStatus = async (userId, status) => {
  const resultAction = await dispatch(updateUserStatus({ userId, status }));

  if (updateUserStatus.fulfilled.match(resultAction)) {
    showSuccess("User status updated successfully");
  } else {
    showError(resultAction.payload || "Failed to update user status");
  }
};



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
        dispatch(getAllUsers({page:pagination.page,perPage:pagination.perPage,search:debouncedSearch}))

      },[pagination.page,pagination.perPage,dispatch,debouncedSearch])

      useEffect(() => {
  if (debouncedSearch) {
    dispatch(setPaginationPage(1));
  }
}, [debouncedSearch, dispatch]);


const SkeletonRow = ({ columns }) => {
  return (
    <TableRow  sx={{ "& td": { border: 0 }, mb: 1 }}> 
      <TableCell>
        <Skeleton variant="circular" width={20} height={20} />
      </TableCell>
      {columns.map((col) => (
        <TableCell key={col.id}>
          <Skeleton
            variant="rectangular"
            width="80%"
            height={30}
            sx={{ borderRadius: "6px", mb: 1 }}  // gap between rows
          />
        </TableCell>
      ))}
    </TableRow>
  );
};



  return (
   <>
    
   <div className="card my-4 shadow-md sm:rounded-lg bg-white pt-5">
  
      <div className=" flex flex-wrap items-center w-full px-5 justify-between ">
      <h2 className='text-[18px] font-[600]'>Users List </h2>
     


        
        <div className="col flex gap-2 ">
            <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
                {
               
                  deleteArray.length>0 &&   <Button  onClick={confirmDeleteMultiple} className='btn !bg-red-600 !text-white btn-sm'>Delete</Button>
                }
            
      
              </div>
              <SearchBox placeholder={' name or email'} value={search} onChange={handleSearchChange} />

        </div>
      
      </div>
      <br />

    <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead className='bg-[#f1f1f1]'>
  <TableRow>
    <TableCell className=' !p-0 md:!p-2'>
      <Checkbox
        checked={users.length > 0 && deleteArray.length === users.length}
        onChange={(e) => handleSelectAllDelete(e.target.checked)}
        {...label}
        size='small'
      />
    </TableCell>

    {columns.map((column) => (
      <TableCell
        key={column.id}
        align={column.align}
        className='whitespace-nowrap font-[600] !text-[12px] md:!text-[14px]'
        sx={{
          display:
            column.id === "phoneNumber" || column.id === "createdDate"
              ? { xs: "none", md: "table-cell" } // hide on xs/sm, show on md+
              : "table-cell",
        }}
      >
        {column.label}
      </TableCell>
    ))}
  </TableRow>
</TableHead>

          <TableBody>
            {
              allUsersLoading ? (
  Array.from(new Array(5)).map((_, index) => (
    <SkeletonRow key={index} columns={columns} />
  ))
)  : 
               users?.length>0 ? users.map((user)=>{
                console.log(user)
                return(
                        <TableRow  className={`${isDeleting.includes(user._id) && 'uploading-gradient-delete'}`} key={user._id} >
                <TableCell 
                // style={{minWidth:columns.minWidth}}
                >
                              <Checkbox checked={deleteArray.includes(user._id)} onChange={(e)=>handleSelectMultipleDelete(user._id,e.target.checked)} {...label} size='small'/>
              
                            </TableCell>
              <TableCell
              //  style={{minWidth:columns.minWidth}}
               >
                <div className='!h-full'>

                <div className="flex   gap-1 md:gap-3">
                  <div className="img w-[25px] h-[25px] md:w-[45px] md:h-[45px] rounded-md overflow-hidden group">
                  <Link to='/'>
                <img alt="" className="w-full group-hover:scale-105 transition-transform" src={user.avatar?.url? user.avatar?.url : 'https://res.cloudinary.com/dllelmzim/image/upload/v1753808261/user_dhgqbt.png'}/>
                  </Link>
              
                </div>
                <div className='flex flex-col justify-between'>
                  <h2 className='text-[13px] md:text-[15px]'>{user.name}</h2>
                  <div className='text-gray-500 flex gap-1 items-center'>
                    <MdOutlineMarkEmailRead />
                    {user.email}
                  </div>


                </div>
                </div>
                
              
                </div>

              </TableCell>

         
              <TableCell 
                sx={{ display: { xs: "none", md: "table-cell" } }}
 style={{minWidth:columns.minWidth}}>
                <div className=" text-gray-700 flex items-center gap-2 ">
          {
            user?.mobile && 
                <MdOutlineLocalPhone className='text-[15px] md:text-[20px]'/>
          }
              {user?.mobile}
              {!user?.mobile && (
                <img className='w-[20px] h-[20px] md:w-[30px] md:h-[30px]' src="https://res.cloudinary.com/dllelmzim/image/upload/v1758055027/no-phone_gapbr3.png" alt="" />
              )}
                </div>
                         </TableCell>
              <TableCell   sx={{ display: { xs: "none", md: "table-cell" } }}
 style={{minWidth:columns.minWidth}}>
                <div className="flex items-center gap-2 text-gray-700 text-nowrap">
                    <RxCalendar className='text-[22px]'/>
                 {user.createdAt.split('T')[0]}
                </div>
                         </TableCell>
         <TableCell style={{ minWidth: columns.minWidth }}>
  <div className="flex flex-wrap gap-2">
   {
    user.role?.map((role,index)=>{

    return <React.Fragment key={index}>
      {

       getStatusChip(role)
      }


    </React.Fragment>
    })
   }
  </div>
</TableCell>
<TableCell style={{ minWidth: columns.minWidth }}>
  <Select
    multiple
    fullWidth
    size="small"
    value={user.role || []}
    onChange={(e) => handleUpdateRoles(user._id, e.target.value)}
    renderValue={(selected) => (
      <div className="flex flex-wrap gap-1">
        {selected.map((value) => (
          <span
            key={value}
            className="px-2  text-[11px] rounded-full bg-blue-100 text-blue-700 border border-blue-300"
          >
            {value}
          </span>
        ))}
      </div>
    )}
  >
    {["USER", "ADMIN", "MODERATOR", "SUPER-ADMIN"].map((role) => (
      <MenuItem className='!text-[13px]' key={role} value={role}>
        <Checkbox size='small'  checked={user.role?.includes(role)} />
        {role}
      </MenuItem>
    ))}
  </Select>
</TableCell>

    <TableCell style={{ minWidth: columns.minWidth }}>
  <Select
    fullWidth
    size="small"
    value={user.status || "inactive"}
    onChange={(e) => handleUpdateStatus(user._id, e.target.value)} 
    sx={{
      fontSize: "13px",
      fontWeight: 600,
      color: user.status === "active" ? "green" : "red",
      "& .MuiSelect-icon": { color: "gray" }, 
    }}
  >
    <MenuItem value="active" sx={{ fontSize: "13px", color: "green", fontWeight: 600 }}>
      ACTIVE
    </MenuItem>
    <MenuItem value="inactive" sx={{ fontSize: "13px", color: "red", fontWeight: 600 }}>
      INACTIVE
    </MenuItem>
  </Select>
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
              }) : (
    <TableRow>
      <TableCell colSpan={columns.length + 1} align="center">
        No users found
      </TableCell>
    </TableRow>
  )
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
         ? `Are you sure you want to permanently delete all selected (${deleteArray.length}) Users? This action cannot be undone.`
         : "Are you sure you want to permanently delete this User? This action cannot be undone."
     }
   />
   </>
  )
}

export default Users
