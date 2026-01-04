import  Button  from '@mui/material/Button'
import React, { useContext, useEffect, useState } from 'react'



//MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TooltipMUI from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Dialog } from '@mui/material';

//Icons
import { MdCloseFullscreen, MdDelete } from "react-icons/md";
import { LuFullscreen } from 'react-icons/lu';


//Router and Redux
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

//Internal Imports
import { MyContext } from '../../App';
import { deleteHomeSlide, getHomeSlides } from '../../features/homeSlide/homeSlide';
import { showError, showSuccess } from '../../utils/toastUtils';
import './homeSlide.css'

const columns=[
  {id:'Image',label:'IMAGE'},
  {id:'action',label:'ACTION'},

]
const HomeSliderBanners = () => {
    const context = useContext(MyContext)
    const dispatch = useDispatch()

    //Redux State
    const {homeSlides,loading}=useSelector(state=>state.homeSlide)

    //UI States
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const[deleteId,setDeleteId]=useState(null)
    
  


      const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleDeleteHomeSlide = async (id) => {
    setDeleteId(id);
    try {
      const resultAction = await dispatch(deleteHomeSlide(id));
      if (deleteHomeSlide.fulfilled.match(resultAction)) {
        showSuccess(resultAction.payload.message || 'Slide deleted successfully');
      } else {
        showError(resultAction.payload || 'Failed to delete slide');
      }
    } catch (error) {
      showError('An unexpected error occurred');
    } finally {
      setDeleteId(null);
    }
  };

  const handlePreview=(url)=>{
    setPreviewImage(url)
    setPreviewOpen(true)
  }

      useEffect(()=>{

        dispatch(getHomeSlides())
      },[])

      console.log(homeSlides)
      
  return (
   <>
   {/* welcome banner */}
     <div className="  grid grid-cols-1 md:grid-cols-2 px-2 py-0 mt-3">
      <h2 className='text-[18px] font-[600]'>Home Slider Banners  </h2>
        <div className="col   flex items-center md:justify-end gap-3">
          <Button className='btn-blue btn-sm '
                onClick={()=>context.setIsAddProductModalOpen({open:true,modal:'Add Home Slide'})}

          > Add Home Slide</Button>

        </div>
    </div>
   <div className="card my-4 shadow-md sm:rounded-lg bg-white p-2 ">
  
   

    <TableContainer 
    // sx={{ maxHeight: 520 }}
    className='max-h-[70vh] home-slider'
    >
        <Table stickyHeader aria-label="sticky table ">
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

      <Button className='!w-[35px] !
      [35px]  bg-[#f1f1f1] !min-w-[35px] md:!min-w-[45px] md:!w-[45px] md:!h-[45px]  !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] hover:!shadow-sm hover:scale-110'
      onClick={()=>handlePreview(slide?.url)}
      >

        <LuFullscreen className='text-[rgba(0,0,0,0.8)] text-[20px] '/>
      </Button>
      </TooltipMUI>
      <TooltipMUI placement='top' title='Remove Banner'>

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
