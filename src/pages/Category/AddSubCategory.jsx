import React, { useState } from 'react'

import Rating from '@mui/material/Rating';
import UploadBox from "../../components/UploadBox";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoIosClose, IoMdCloudUpload } from "react-icons/io";
import { Button } from '@mui/material';
import {Select} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';


const AddSubCategory = () => {
        const [productCat, setProductCat] = useState('');


          const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
  };
  

  return (
    <section className="p-5  bg-gray-50">
      <form className="addProductForm  p-8 py-3 ">
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
            <div className="grid grid-cols-4 mb-3 gap-4">
               <div className="col  ">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Sub Category Name</h3>
  <Select
  sx={{
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0,0,0,0.2)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0,0,0,0.4)', 
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0,0,0,0.5)', 
      outline:'none'
    },
  }}
          labelId="productCatDropLabel"
          id="productCatDrop"
          value={productCat}
          label="Product Category"
          size="small"
          className="w-full border-[rgba(0,0,0,0.1)] focus:!outline-none focus:!border-[rgba(0,0,0,0.5)] "
          onChange={handleChangeProductCat}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={10}>Fashion</MenuItem>
          <MenuItem value={20}>Beauty</MenuItem>
          <MenuItem value={30}>Wellness</MenuItem>
        </Select>
          </div>
                <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Sub Category Name</h3>
            <input
            
              type="number"
              name="price"
              id="price"
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)]
               rounded-sm text-sm "
            />
          </div>  
        </div>
        <br />
       
    </div>
    
        <div className='w-[250px]'>

        <Button type="button" className="btn-blue btn-lg mt-3 w-full gap " >
            <IoMdCloudUpload className="text-[25px] text-white"/>
            Publish and View</Button>
        </div>


    </form>
    </section>
  )
}

export default AddSubCategory
