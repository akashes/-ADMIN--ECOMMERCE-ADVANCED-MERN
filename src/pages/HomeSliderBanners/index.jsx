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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TooltipMUI from '@mui/material/Tooltip';

import IconButton from '@mui/material/IconButton';


import { FaEye } from "react-icons/fa";
import { MdCloseFullscreen, MdDelete } from "react-icons/md";
import { BsArrowsFullscreen } from "react-icons/bs";



import { MyContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHomeSlide, getHomeSlides } from '../../features/homeSlide/homeSlide';
import { showError, showSuccess } from '../../utils/toastUtils';


import './homeSlide.css'
import { Dialog, DialogContent } from '@mui/material';
import { AiOutlineFullscreen } from 'react-icons/ai';
import { LuFullscreen } from 'react-icons/lu';
const columns=[
  {id:'Image',label:'IMAGE'},
  {id:'action',label:'ACTION'},

]
const HomeSliderBanners = () => {
    const context = useContext(MyContext)
    const dispatch = useDispatch()

    const [previewOpen, setPreviewOpen] = useState(false);
const [previewImage, setPreviewImage] = useState('');

    const {homeSlides}=useSelector(state=>state.homeSlide)
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
      const [page, setPage] = React.useState(0);
        const [categoryFilterVal, setCategoryFilterVal] = useState('');
        const[deleteId,setDeleteId]=useState(false)
    
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

      const handleDeleteHomeSlide=async(id)=>{
        setDeleteId(id)
       const resultAction = await dispatch(deleteHomeSlide(id))
        if(deleteHomeSlide.fulfilled.match(resultAction)){
          setDeleteId(false)
        
                    showSuccess(resultAction.payload.message || 'Home Slide Deleted successfully')
                 
                  }
                  if(deleteHomeSlide.rejected.match(resultAction)){
                    setDeleteId(false)
                    showError(resultAction.payload || 'Failed to Delete Home-Slide')
                  }


      }

      useEffect(()=>{

        dispatch(getHomeSlides())
      },[])

      console.log(homeSlides)
      
  return (
   <>
   {/* welcome banner */}
     <div className="grid grid-cols-1 md:grid-cols-2 px-2 py-0 mt-3">
      <h2 className='text-[18px] font-[600]'>Home Slider Banners  </h2>
        <div className="col   flex items-center md:justify-end gap-3">
          <Button className='btn-blue btn-sm '
                onClick={()=>context.setIsAddProductModalOpen({open:true,modal:'Add Home Slide'})}

          > Add Home Slide</Button>

        </div>
    </div>
   <div className="card my-4 shadow-md sm:rounded-lg bg-white pt-5">
  
   

    <TableContainer sx={{ maxHeight: 520 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className='bg-[#f1f1f1]'>
            {
              homeSlides?.length>0 && 
                   <TableRow>
              {/* <TableCell>
                <Checkbox {...label} size='small'/>
                
              </TableCell> */}
              {columns.map((column) => (
                <TableCell
                className='!pl-4  md:!pl-12'
                
                // width={column.minWidth}
                  key={column.id}
                  align={column.align}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
            }
       
          </TableHead>
          <TableBody>
          
        
            {
              homeSlides?.length>0 && homeSlides.map((slide)=>(
                <TableRow key={slide._id} className={`${deleteId ===slide._id && 'uploading-gradient-delete'}`} >
        
              <TableCell 
              className=' !pl-2 md:!pl-10'
              >
                <div className="flex items-center gap-2 w-[200px] md:w-[500px] ">
                  <div className="img w-[full] h-auto rounded-md overflow-hidden group">
                  <Link to='/'>
                <img alt="" className=" w-[200px] md:w-full  group-hover:scale-105 transition-transform" src={slide.url}/>
                  </Link>
              
                </div>
               
                </div>

              </TableCell>
          

              <TableCell
              >
                   <div className="flex flex-col md:flex-row items-center gap-2 md:gap-5">

      <TooltipMUI placement='top' title='View Banner'>

      <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !min-w-[35px] md:!min-w-[45px] md:!w-[45px] md:!h-[45px]  !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] hover:!shadow-sm hover:scale-110'
      onClick={()=>{
              setPreviewImage(slide.url);
      setPreviewOpen(true);

      }}
      >

        <LuFullscreen className='text-[rgba(0,0,0,0.8)] text-[20px] '/>
      </Button>
      </TooltipMUI>
      <TooltipMUI placement='top' title='Remove Product'>

      <Button onClick={()=>handleDeleteHomeSlide(slide._id)} className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !min-w-[35px] md:!min-w-[45px] md:!w-[45px]  md:!h-[45px] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] hover:!shadow-sm hover:scale-110'>

        <MdDelete className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
      </Button>
      </TooltipMUI>
    </div>
              </TableCell>
        
            </TableRow>
              ))
            }
   

          
          </TableBody>
        </Table>
      </TableContainer>
    



        

   </div> 

   
<Dialog
  open={previewOpen}
  onClose={() => setPreviewOpen(false)}
  maxWidth="md"
  fullWidth
  PaperProps={{
    sx: { position: 'relative', padding: 2 }
  }}
    BackdropProps={{
    sx: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)' // darker background
    }
  }}
>
  {/* Close Button */}
  <IconButton
    onClick={() => setPreviewOpen(false)}
    sx={{
      position: 'absolute',
      top: 8,
      right: 8,
      color: 'rgba(0,0,0,0.8)',
      backgroundColor: 'rgba(255,255,255,0.8)',
      '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
    }}
  >
    <MdCloseFullscreen />
  </IconButton>

  {/* Image */}
  <img
    src={previewImage}
    alt="Banner Preview"
    style={{
      width: '100%',
      height: 'auto',
      objectFit: 'contain',
      borderRadius: '8px'
    }}
  />
</Dialog>
   </>
  )
}

export default HomeSliderBanners
