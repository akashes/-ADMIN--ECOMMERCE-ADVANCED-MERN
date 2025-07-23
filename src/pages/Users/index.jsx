import  Button  from '@mui/material/Button'
import React, { useContext, useState } from 'react'

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


import ProgressBar from '../../components/ProgressBar'



import { AiFillEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SearchBox from '../../components/SearchBox';


import { MdOutlineLocalPhone } from "react-icons/md";


import { MdOutlineMarkEmailRead } from "react-icons/md";
 


import { MyContext } from '../../App';



const columns=[
  {id:'userImg',label:'USER IMAGE',minWidth:80},
  {id:'userName',label:'USER NAME',minWidth:100},
  {id:'userEmail',label:'EMAIL',minWidth:150},
  {id:'phoneNumber',label:'PHONE.NO',minWidth:100},

]
const Users = () => {
    const context = useContext(MyContext)
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
      const [page, setPage] = React.useState(0);
    
          const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
      const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
   <>
    
   <div className="card my-4 shadow-md sm:rounded-lg bg-white pt-5">
  
      <div className="flex items-center w-full px-5 justify-between ">
        <div className="col w-[40%]">
      <h2 className='text-[18px] font-[600]'>Users List </h2>


        
        </div>
        <div className="col w-[40%] ml-auto">
              <SearchBox/>

        </div>
      
      </div>
      <br />

    <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className='bg-[#f1f1f1]'>
            <TableRow>
              <TableCell>
                <Checkbox {...label} size='small'/>
                
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
            <TableRow >
              <TableCell style={{minWidth:columns.minWidth}}>
                <Checkbox {...label} size='small'/>

              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <div className="flex items-center gap-4 w-[70px]"><div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                  <Link to='/'>
                <img alt="" className="w-full group-hover:scale-105 transition-transform" src="https://th.bing.com/th/id/OIP.hTxZrOQUYguQuDSHn0ctrwHaHZ?w=172&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"/>
                  </Link>
              
                </div>
              
                </div>

              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                 Akash es
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <div className="flex items-center gap-2">

                <MdOutlineMarkEmailRead />
                  akashes@gmail.com
                </div>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <div className="flex items-center gap-2">

                <MdOutlineLocalPhone className='text-[20px]'/>
              +91-9768675579
                </div>
                         </TableCell>
            
        
             
        
            </TableRow>
        
       
          </TableBody>
        </Table>
      </TableContainer>
       <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={10}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />



        

   </div> 
   </>
  )
}

export default Users
