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


import { Dialog, DialogContent } from '@mui/material';
import { AiFillEdit, AiOutlineFullscreen } from 'react-icons/ai';
import { LuFullscreen } from 'react-icons/lu';
import { deleteAdBannerV1, getBannersV1 } from '../../features/bannerV1/bannerv1Slice';
import { deleteBlog, getAllBlogs } from '../../features/blog/blogSlice';
const columns=[
  {id:'Image',label:'IMAGE'},
  {id:'title',label:'TITLE'},
  {id:'description',label:'DESCRIPTION'},
  {id:'action',label:'ACTION'},

]
const BlogList = () => {
    const context = useContext(MyContext)
    const dispatch = useDispatch()

    const [previewOpen, setPreviewOpen] = useState(false);
const [previewImage, setPreviewImage] = useState('');

    const {blogs}=useSelector(state=>state.blog)

        const[deleteId,setDeleteId]=useState(false)
    
 


      const handleDeleteBanner=async(id)=>{
        setDeleteId(id)
       const resultAction = await dispatch(deleteBlog(id))
        if(deleteBlog.fulfilled.match(resultAction)){
          setDeleteId(false)
        
                    showSuccess(resultAction.payload.message || 'Blog` Deleted successfully')
                 
                  }
                  if(deleteBlog.rejected.match(resultAction)){
                    setDeleteId(false)
                    showError(resultAction.payload || 'Failed to Delete Blog')
                  }


      }

      useEffect(()=>{

        dispatch(getAllBlogs())
      },[])

      console.log(blogs)
      
  return (
   <>
   {/* welcome banner */}
     <div className="flex items-center justify-between px-2 py-0 mt-3">
      <h2 className='text-[18px] font-[600]'>Ad Banners  </h2>
        <div className="col  ml-auto flex items-center justify-end gap-3">
          <Button className='btn-blue btn-sm text-nowrap'
                onClick={()=>context.setIsAddProductModalOpen({open:true,modal:'Add Blog'})}

          > Add Blog</Button>

        </div>
    </div>
   <div className="card my-4 shadow-md sm:rounded-lg bg-white pt-5">
  
   

    <TableContainer sx={{ maxHeight: 520 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className='bg-[#f1f1f1]'>
            {
              blogs?.length>0 && 
                   <TableRow>
              {/* <TableCell>
                <Checkbox {...label} size='small'/>
                
              </TableCell> */}
              {columns.map((column,index) => (
                <TableCell
                className={`${index===0 && ' !pl-2  md:!pl-12'}`}
                
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
              blogs?.length>0 && blogs.map((blog)=>(
                <TableRow className={`${deleteId ===blog._id && 'uploading-gradient-delete'}`} >
        
              <TableCell 
              className='!pl-1 md:!pl-10'
              >
                <div className="flex items-center gap-4 w-[250px] md:w-[300px]"><div className="img w-[full] h-auto rounded-md overflow-hidden group">
                  <Link to='/'>
                <img alt="" className="w-full group-hover:scale-105 transition-transform" src={blog.blogImage?.url}/>
                  </Link>
              
                </div>
               
                </div>

              </TableCell>

              <TableCell className='!max-w-[150px] md:max-w-[350px]'>
<span className="text-[15px] font-[500] ">
  {blog.title?.length >20
    ? blog.title.substr(0, 20) + '...'
    : blog.title}
</span>

              </TableCell>

              <TableCell 
              className=' min-w-[200px] max-w-[400px] md:max-w-[500px]'
              >
                <span className='text-[14px] inline-block'>
                    <div dangerouslySetInnerHTML={{__html:blog?.description?.substr(0,300)+'...'}} >

                    </div>
                </span>

              </TableCell>
          

              <TableCell
              >
                   <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-5">
                      <TooltipMUI placement='top' title='View Blog Image'>
                    
                          <Button className='!w-[35px]  !h-[35px]  !min-w-[35px] md:!w-[45px] md:!h-[45px] md:!min-w-[45px]  bg-[#f1f1f1]   !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] hover:!shadow-sm hover:scale-110'
                          onClick={()=>{
                                  setPreviewImage(blog.blogImage.url);
                          setPreviewOpen(true);
                    
                          }}
                          >
                    
                            <LuFullscreen className='text-[rgba(0,0,0,0.8)] text-[20px] '/>
                          </Button>
                          </TooltipMUI>

         <TooltipMUI placement='top' title='Edit Blog'>

      <Button 
                    onClick={()=>context.setIsAddProductModalOpen({open:true,modal:'Edit Blog',id:blog._id})}

      className='!w-[35px]  !h-[35px]  !min-w-[35px] md:!w-[45px] md:!h-[45px] md:!min-w-[45px]  bg-[#f1f1f1]  !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] hover:!shadow-sm hover:scale-110'>

        <AiFillEdit  className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
      </Button>

      
      </TooltipMUI>
      <TooltipMUI placement='top' title='Remove Product'>

      <Button onClick={()=>handleDeleteBanner(blog._id)} className='!w-[35px]  !h-[35px]  !min-w-[35px] md:!w-[45px] md:!h-[45px] md:!min-w-[45px] bg-[#f1f1f1]  !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] hover:!shadow-sm hover:scale-110'>

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

export default BlogList
