import { CircularProgress, Tooltip } from '@mui/material';
import React from 'react';
import { FaRegImages } from "react-icons/fa6";
import './uploadbox.css'; 

const UploadBox = (props) => {
  return (
    <div className={`uploadBox p-3 rounded-md overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors flex flex-col justify-center items-center relative ${
      props.isUploading ? 'uploading-gradient' : ''
    }`}>
      <FaRegImages className='text-[40px] opacity-35 ' />
     <h4 className=' text-[15px] md:text-[17px] text-[rgba(0,0,0,0.5)]  flex items-center '>
  {props.isUploading ? (
    <>
      <span className='ml-1'>Uploading</span>
      <span className="dot-animation ml-1 font-bold" />
    </>
  ) : (
    'Image Upload'
  )}
</h4>
          {
            props.multiple===true?<input
        disabled={props.isUploading}
        onChange={props.onChange}
        type="file"
        multiple={props.multiple !== undefined ? props.multiple : false}
        className='absolute top-0 left-0 w-full h-full opacity-0 z-50'
        />   :  
         <Tooltip title='Only One Slide Upload at a time'>

      <input
        disabled={props.isUploading}
        onChange={props.onChange}
        type="file"
        multiple={props.multiple !== undefined ? props.multiple : false}
        className='absolute top-0 left-0 w-full h-full opacity-0 z-50'
        />
        </Tooltip>
          }  
        
    </div>
  );
};

export default UploadBox;

