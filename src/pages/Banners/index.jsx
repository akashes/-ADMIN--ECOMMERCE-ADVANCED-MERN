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

import IconButton from '@mui/material/IconButton';


import { FaEye } from "react-icons/fa";
import { MdCloseFullscreen, MdDelete } from "react-icons/md";
import { BsArrowsFullscreen } from "react-icons/bs";



import { MyContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHomeSlide, getHomeSlides } from '../../features/homeSlide/homeSlide';
import { showError, showSuccess } from '../../utils/toastUtils';


import './adBanner.css'
import { Dialog, DialogContent } from '@mui/material';
import { AiOutlineFullscreen } from 'react-icons/ai';
import { LuFullscreen } from 'react-icons/lu';
import { deleteAdBannerV1, getBannersV1 } from '../../features/bannerV1/bannerv1Slice';
const columns=[
  {id:'Image',label:'IMAGE',minWidth:250},
  {id:'action',label:'ACTION',minWidth:100},

]
const BannerV1 = () => {
    const context = useContext(MyContext)
    const dispatch = useDispatch()

    const [previewOpen, setPreviewOpen] = useState(false);
const [previewImage, setPreviewImage] = useState('');

    const {banners}=useSelector(state=>state.bannerV1)

        const[deleteId,setDeleteId]=useState(false)
    
 


      const handleDeleteBanner=async(id)=>{
        console.log('id is ',id)
        setDeleteId(id)
       const resultAction = await dispatch(deleteAdBannerV1(id))
        if(deleteAdBannerV1.fulfilled.match(resultAction)){
          setDeleteId(false)
        
                    showSuccess(resultAction.payload.message || 'Ad Banner Deleted successfully')
                 
                  }
                  if(deleteAdBannerV1.rejected.match(resultAction)){
                    setDeleteId(false)
                    showError(resultAction.payload || 'Failed to Delete Ad Banner')
                  }


      }

      useEffect(()=>{

        dispatch(getBannersV1())
      },[])

      console.log(banners)
      
  return (
   <>
   {/* welcome banner */}
     <div className="flex items-center justify-between px-2 py-0 mt-1 md:mt-3">
      <h2 className='text-[18px] font-[600]'>Ad Banners  </h2>
        <div className="col  ml-auto flex items-center justify-end gap-3">
          <Button className='btn-blue btn-sm text-nowrap !px-2 '
                onClick={()=>context.setIsAddProductModalOpen({open:true,modal:'Add BannerV1'})}

          > Add Banner</Button>

        </div>
    </div>
   <div className="card my-4 shadow-md sm:rounded-lg bg-white pt-5">
  
   

    <TableContainer  sx={{ maxHeight: 520 }}  >
        <Table stickyHeader aria-label="sticky table">
          <TableHead className='bg-[#f1f1f1]'>
            {
              banners?.length>0 && 
                   <TableRow>
              {/* <TableCell>
                <Checkbox {...label} size='small'/>
                
              </TableCell> */}
              {columns.map((column) => (
                <TableCell
                className=' !pl-3 md:!pl-12'
                
                width={column.minWidth}
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
              banners?.length>0 && banners.map((slide)=>(
                <TableRow className={`${deleteId ===slide._id && 'uploading-gradient-delete'}`} >
        
              <TableCell 
              className=' !pl-2 md:!pl-10'
              >
                <div className="flex items-center gap-4 w-[150px] md:w-[300px]"><div className="img w-[full] h-auto rounded-md overflow-hidden group">
                  <Link to='/'>
                <img alt="" className="w-full group-hover:scale-105 transition-transform" src={slide.bannerImage?.url}/>
                  </Link>
              
                </div>
               
                </div>

              </TableCell>
          

              <TableCell
              width={100}
              >
                   <div className="flex items-center gap-5">

      <TooltipMUI placement='top' title='View Banner'>

      <Button className='!w-[45px] !h-[45px]  bg-[#f1f1f1] !min-w-[45px]  !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] hover:!shadow-sm hover:scale-110'
      onClick={()=>{
              setPreviewImage(slide.bannerImage.url);
      setPreviewOpen(true);

      }}
      >

        <LuFullscreen className='text-[rgba(0,0,0,0.8)] text-[20px] '/>
      </Button>
      </TooltipMUI>
      <TooltipMUI placement='top' title='Remove Product'>

      <Button onClick={()=>handleDeleteBanner(slide._id)} className='!w-[45px] !h-[45px]  bg-[#f1f1f1] !min-w-[35px]  !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] hover:!shadow-sm hover:scale-110'>

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
  maxWidth="lg"
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

export default BannerV1
