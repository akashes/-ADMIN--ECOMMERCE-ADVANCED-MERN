import React, { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Rating from '@mui/material/Rating';
import UploadBox from "../../components/UploadBox";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoIosClose } from "react-icons/io";
import { Button } from "@mui/material";
import { IoMdCloudUpload } from "react-icons/io";

const AddProduct = () => {
      const [productCat, setProductCat] = useState('');
      const [productSubCat, setProductSubCat] = useState('');
      const[productFeatured,setProductFeatured]=useState('');
      const[productRams,setProductRams]=useState('');
      const[productWeight,setProductWeight]=useState('');
      const[productSize,setProductSize]=useState('');
  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
  };
  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
  };

  const handleChangeProductFeatured=(event) => {
    setProductFeatured(event.target.value);
  };
  const handleChangeProductRams=(event) => {
    setProductRams(event.target.value);
  };
  const handleChangeProductWeight=(event) => {
    setProductWeight(event.target.value);
  };
  const handleChangeProductSize=(event) => {
    setProductSize(event.target.value);
  };


  return (
    <section className="p-5 bg-gray-50">
      <form className="addProductForm  p-8 py-3 ">
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4">

        <div className="grid grid-cols-1 mb-3">
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Name</h3>
            <input
              type="text"
              name="name"
              id=""
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm text-sm "
            />
          </div>
        </div>
        <div className="grid grid-cols-1 mb-3">
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Description</h3>
            <textarea
              type="text"
              name="description"
              id=""
              className="w-full h-[140px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm text-sm "
            />
          </div>
        </div>
        <div className="grid grid-cols-4 mb-3 gap-4">
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Category</h3>
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
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Sub Category</h3>
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
          value={productSubCat}
          label="Product Category"
          size="small"
          className="w-full border-[rgba(0,0,0,0.1)] focus:!outline-none focus:!border-[rgba(0,0,0,0.5)] "
          onChange={handleChangeProductSubCat}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={10}>Men</MenuItem>
          <MenuItem value={20}>Women</MenuItem>
          <MenuItem value={30}>Kids</MenuItem>
        </Select>
          </div>
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Old Price</h3>
            <input
            
              type="number"
              name="price"
              id="price"
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)]
               rounded-sm text-sm "
            />
          </div>
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Price</h3>
            <input
            
              type="number"
              name="price"
              id="price"
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)]
               rounded-sm text-sm "
            />
          </div>  
          {/* product featured */}
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Is Featured?</h3>
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
          value={productFeatured}
          label="Product Category"
          size="small"
          className="w-full border-[rgba(0,0,0,0.1)] focus:!outline-none focus:!border-[rgba(0,0,0,0.5)] "
          onChange={handleChangeProductFeatured}
        >
          <MenuItem value={10}>True</MenuItem>
          <MenuItem value={20}>False</MenuItem>
        </Select>
          </div>
          {/* stock */}
           <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Stock</h3>
            <input
            
              type="number"
              name="price"
              id="price"
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)]
               rounded-sm text-sm "
            />
          </div>
          {/* brand */}
           <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Brand</h3>
            <input
            
              type="text"
              name="price"
              id="price"
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)]
               rounded-sm text-sm "
            />
          </div>
          {/* discount */}
            <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Discount</h3>
            <input
            
              type="text"
              name="price"
              id="price"
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)]
               rounded-sm text-sm "
            />
          </div>

      
        </div>
        <div className="grid grid-cols-4 mb-3 gap-4">
            {/* ram */}
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product RAMS</h3>
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
          value={productRams}
          label="Product Category"
          size="small"
          className="w-full border-[rgba(0,0,0,0.1)] focus:!outline-none focus:!border-[rgba(0,0,0,0.5)] "
          onChange={handleChangeProductRams}
        >
          <MenuItem value={'4GB'}>4GB</MenuItem>
          <MenuItem value={'6GB'}>6GB</MenuItem>
          <MenuItem value={'8GB'}>8GB</MenuItem>
          <MenuItem value={'10GB'}>10GB</MenuItem>
        </Select>
          </div>
          {/* weight */}
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Weight</h3>
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
          value={productWeight}
          label="Product Category"
          size="small"
          className="w-full border-[rgba(0,0,0,0.1)] focus:!outline-none focus:!border-[rgba(0,0,0,0.5)] "
          onChange={handleChangeProductWeight}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={10}>2KG</MenuItem>
          <MenuItem value={20}>4KG</MenuItem>
          <MenuItem value={30}>5KG</MenuItem>
        </Select>
          </div>
          {/* size */}
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Size</h3>
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
          value={productSize}
          label="Product Category"
          size="small"
          className="w-full border-[rgba(0,0,0,0.1)] focus:!outline-none focus:!border-[rgba(0,0,0,0.5)] "
          onChange={handleChangeProductSize}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={'S'}>S</MenuItem>
          <MenuItem value={'M'}>M</MenuItem>
          <MenuItem value={'L'}>L</MenuItem>
        </Select>
           
          </div>
          {/* rating */}
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Rating</h3>
                 <Rating name="half-rating" defaultValue={2.5} precision={0.5} />

          </div>  
       

      
        </div>
        {/* media and image section */}
        <div className="col w-full p-5 px-0">
            <h3 className="font-[700] text-[18px] mb-3">Media and Images</h3>
            <div className="grid grid-cols-7 gap-4 ">
                <div className="uploadBoxWrapper relative">
                    <span className="absolute w-[20px] h-[20px] opacity-90 rounded-full overflow-hidden bg-primary top-[-5px] right-[-5px] cursor-pointer flex items-center justify-center z-50">
                        <IoIosClose className="text-white text-[19px]" />
                    </span>
                    
             <div className='uploadBox p-0 rounded-md  overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors flex flex-col justify-center items-center relative'>

                     <LazyLoadImage
                     className="w-full h-full object-cover"
                     effect="blur"
                         wrapperProps={{
                   style: {transitionDelay: "1s"},
    }}

      alt={"image"}
                            src={'https://serviceapi.spicezgold.com/download/1749796588779_hp-15-fb0082ax-victus-gaming-laptop-amd-ryzen5-5600h-8gb-512gb-ssd-4-gb-nvidia-geforce-rtx-3050-graphics-windows-11-mso-fhd-39-6-cm-15-6-inch-digital-o493178411-p594412844-0-202406241824.jpeg'}
                            />
                </div>
                 </div>
                <div className="uploadBoxWrapper relative">
                    <span className="absolute w-[20px] h-[20px] opacity-90 rounded-full overflow-hidden bg-primary top-[-5px] right-[-5px] cursor-pointer flex items-center justify-center z-50">
                        <IoIosClose className="text-white text-[19px]" />
                    </span>
                    
             <div className='uploadBox p-0 rounded-md  overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors flex flex-col justify-center items-center relative'>

                     <LazyLoadImage
                     className="w-full h-full object-cover"
                     effect="blur"
                         wrapperProps={{
                   style: {transitionDelay: "1s"},
    }}

      alt={"image"}
                            src={'https://serviceapi.spicezgold.com/download/1749796588779_hp-15-fb0082ax-victus-gaming-laptop-amd-ryzen5-5600h-8gb-512gb-ssd-4-gb-nvidia-geforce-rtx-3050-graphics-windows-11-mso-fhd-39-6-cm-15-6-inch-digital-o493178411-p594412844-0-202406241824.jpeg'}
                            />
                </div>
                 </div>
                <div className="uploadBoxWrapper relative">
                    <span className="absolute w-[20px] h-[20px] opacity-90 rounded-full overflow-hidden bg-primary top-[-5px] right-[-5px] cursor-pointer flex items-center justify-center z-50">
                        <IoIosClose className="text-white text-[19px]" />
                    </span>
                    
             <div className='uploadBox p-0 rounded-md  overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors flex flex-col justify-center items-center relative'>

                     <LazyLoadImage
                     className="w-full h-full object-cover"
                     effect="blur"
                         wrapperProps={{
                   style: {transitionDelay: "1s"},
    }}

      alt={"image"}
                            src={'https://serviceapi.spicezgold.com/download/1749796588779_hp-15-fb0082ax-victus-gaming-laptop-amd-ryzen5-5600h-8gb-512gb-ssd-4-gb-nvidia-geforce-rtx-3050-graphics-windows-11-mso-fhd-39-6-cm-15-6-inch-digital-o493178411-p594412844-0-202406241824.jpeg'}
                            />
                </div>
                 </div>
                <div className="uploadBoxWrapper relative">
                    <span className="absolute w-[20px] h-[20px] opacity-90 rounded-full overflow-hidden bg-primary top-[-5px] right-[-5px] cursor-pointer flex items-center justify-center z-50">
                        <IoIosClose className="text-white text-[19px]" />
                    </span>
                    
             <div className='uploadBox p-0 rounded-md  overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors flex flex-col justify-center items-center relative'>

                     <LazyLoadImage
                     className="w-full h-full object-cover"
                     effect="blur"
                         wrapperProps={{
                   style: {transitionDelay: "1s"},
    }}

      alt={"image"}
                            src={'https://serviceapi.spicezgold.com/download/1749796588779_hp-15-fb0082ax-victus-gaming-laptop-amd-ryzen5-5600h-8gb-512gb-ssd-4-gb-nvidia-geforce-rtx-3050-graphics-windows-11-mso-fhd-39-6-cm-15-6-inch-digital-o493178411-p594412844-0-202406241824.jpeg'}
                            />
                </div>
                 </div>
                <div className="uploadBoxWrapper relative">
                    <span className="absolute w-[20px] h-[20px] opacity-90 rounded-full overflow-hidden bg-primary top-[-5px] right-[-5px] cursor-pointer flex items-center justify-center z-50">
                        <IoIosClose className="text-white text-[19px]" />
                    </span>
                    
             <div className='uploadBox p-0 rounded-md  overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors flex flex-col justify-center items-center relative'>

                     <LazyLoadImage
                     className="w-full h-full object-cover"
                     effect="blur"
                         wrapperProps={{
                   style: {transitionDelay: "1s"},
    }}

      alt={"image"}
                            src={'https://serviceapi.spicezgold.com/download/1749796588779_hp-15-fb0082ax-victus-gaming-laptop-amd-ryzen5-5600h-8gb-512gb-ssd-4-gb-nvidia-geforce-rtx-3050-graphics-windows-11-mso-fhd-39-6-cm-15-6-inch-digital-o493178411-p594412844-0-202406241824.jpeg'}
                            />
                </div>
                 </div>

                <UploadBox multiple={true}/>
            </div>

        </div>
        </div>
        <hr />
        <br /> 
        <Button type="button" className="btn-blue btn-lg mt-3 w-full gap" >
            <IoMdCloudUpload className="text-[25px] text-white"/>
            Publish and View</Button>
     
      </form>
    </section>
  );
};

export default AddProduct;
