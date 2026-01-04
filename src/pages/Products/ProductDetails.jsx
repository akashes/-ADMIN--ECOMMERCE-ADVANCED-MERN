import React, { useEffect, useRef, useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from "swiper/modules";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  getSingleProductDataForProductDetailsPage } from '../../features/product/productSlice';
import { MdBrandingWatermark, MdRateReview, MdVerified } from 'react-icons/md';
import { BiSolidCategoryAlt } from 'react-icons/bi';

import { TbRuler } from "react-icons/tb";         
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdMemory } from "react-icons/md";        
import { MdSdStorage } from "react-icons/md";     
import { FaMicrochip } from "react-icons/fa6";     
import Rating from '@mui/material/Rating';
import { CircularProgress } from '@mui/material';

export const ATTRIBUTES_ARRAY = {
  fashion: ["size", "color"],
  mobile: ["ram", "storage"],
  laptop: ["processor", "ram", "storage"]
};

export const ATTRIBUTE_ICONS = {
  size: <TbRuler className="text-lg" />,
  color: <IoColorPaletteOutline className="text-lg" />,
  ram: <MdMemory className="text-lg" />,
  storage: <MdSdStorage className="text-lg" />,
  processor: <FaMicrochip className="text-lg" />
};


const ProductDetails = () => {
    const{currentProduct,error,loading}=useSelector(state=>state.product)
    console.log(currentProduct)
    const[value,setValue]=useState(3)
    const allowedAttributes = ATTRIBUTES_ARRAY[currentProduct?.catName] || ATTRIBUTES_ARRAY[currentProduct?.subCat] || []
    console.log(allowedAttributes)

    //filtered attributes
    const filteredAttributes = Object.entries(currentProduct?.attributes || {})
  .filter(([key]) => allowedAttributes.includes(key));
  console.log(filteredAttributes)

       const[slideIndex,setSlideIndex]=useState(0)
const zoomSliderBig = useRef(null)
const zoomSliderSmall = useRef(null)

const dispatch = useDispatch()
const{id}=useParams()

    const goto=(index)=>{
        setSlideIndex(index);
        zoomSliderBig.current.swiper.slideTo(index)
        zoomSliderSmall.current.swiper.slideTo(index)
    }

    useEffect(()=>{
        if(id){
            dispatch(getSingleProductDataForProductDetailsPage(id))
            

        }

    },[id])



  return (
 <>

    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
      <h2 className='text-[18px] font-[600]'>Product Details</h2>
       </div>
       {
        loading &&  <div className='flex h-[100vh] w-[100vw]  items-center justify-center'>
            <CircularProgress/>
        </div> 
       }
       {
        currentProduct &&  
        <>
          <div className='productDetails flex gap-5'>
        <div className='w-[40%]'>
          {
            currentProduct?.images?.length!==0 ? <>
                  <div className="flex gap-10 ">

        <div className={`slider w-[15%] `}>
              <Swiper
              
              direction={'vertical'}
        
        slidesPerView={5}
        spaceBetween={10}
        
        navigation={true}
        modules={[Navigation]}
        className={`zoomProductSliderThumbs !h-[400px] overflow-hidden ${currentProduct.images.length>5 && 'space'}`}
        ref={zoomSliderSmall}
      >
  
  {
    currentProduct?.images?.length>0 && currentProduct.images.map((image,index)=>(
                <SwiperSlide key={index}>
            <div className={`item rounded-md overflow-hidden cursor-pointer group  ${slideIndex===index? 'opacity-100':'opacity-30'}`}>
                <img src={image.url} alt=""
                className='w-full transition-all group-hover:scale-105 duration-300 ease-in-out'
                loading="lazy"
                onClick={()=>goto(index)}
                />
            </div>
        </SwiperSlide>

    ))
  }

       

  
     

      </Swiper>
        </div>
        <div className='zoomContainer w-[85%] !h-[400px] !rounded-md overflow-hidden'>
             <Swiper        
        slidesPerView={1}
        spaceBetween={0}
        navigation={false}
        ref={zoomSliderBig}
        
      >
        {
            currentProduct?.images?.length>0 && currentProduct.images.map((image,index)=>(
                    <SwiperSlide key={index}>

        <InnerImageZoom zoomType="click" zoomScale={1} src={image.url} />
        </SwiperSlide>
                
            ))
        }
    
     

      </Swiper>

</div>

    </div>
            </>:
            <p>No Product Images found</p>
          }

        </div>
        <div className='w-[60%]'>
            <h2 className='text-[25px] font-[500] mb-4'>{currentProduct.name}</h2>
            <div className="flex items-center py-1">
                <span className='w-[20%] font-[500] flex items-center gap-2 text-[14px]'><MdBrandingWatermark className='opacity-65' /> Brand: </span>
                <span className='text-[14px]'>{currentProduct.brand}</span>
            </div>
            <div className="flex items-center py-1">
                <span className='w-[20%] font-[500] flex items-center gap-2'><BiSolidCategoryAlt className='opacity-65' /> Category: </span>
                <span  className='text-[14px]' >{currentProduct?.catName}</span>
            </div>
            {allowedAttributes.map(attrKey => {
      const value = currentProduct?.attributes?.[attrKey];
      if (!value) return null; // skip if attribute not present

      return (
        <div key={attrKey} className="flex items-center gap-2 py-1">
          {ATTRIBUTE_ICONS[attrKey]}
          <span className="font-medium">{attrKey}:</span>
          <span>{value}</span>
        </div>
      );
    })}

        <div className="flex items-center py-1">
                <span className='w-[20%] font-[500] flex items-center gap-2'><MdRateReview className='opacity-65' /> Review: </span>
                <span  className='text-[14px]' >({currentProduct?.reviews?.length>0 ?currentProduct?.reviews?.length : 0})Reviews</span>
            </div>
        <div className="flex items-center py-1">
                <span className='w-[20%] font-[500] flex items-center gap-2'><MdVerified className='opacity-65' /> Published: </span>
                <span  className='text-[14px]' >{currentProduct.dateCreated.split('T')[0]}</span>
            </div>
       
              <br />
       <h2 className='text-[25px] font-[500]'>Product Description</h2>
       {
        currentProduct?.description && <p className='text-[14px] mb-3   '>{currentProduct.description}
        </p>
       }
    
       </div>

       </div>
       <br />

       <h2 className='text-[18px] font-[500]'>Customer Reviews</h2>
       <div className="reviewsWrap mt-3">
        {
            currentProduct?.reviews?.length>0 ? (
                currentProduct?.reviews?.map((review)=>(

        <div key={review._id} className="reviews rounded-sm mb-3 w-full h-auto p-4 bg-white shadow-md flex items-center justify-between">
            <div className="flex items-center gap-8">
                <div className="img w-[85px] h-[85px] overflow-hidden rounded-full  ">
                    <img src={review?.user?.avatar?.url} className='w-full h-full object-cover' />
                </div>
                <div className='info w-[80%]'>
                    <div className="flex items-center justify-between">
                <h4 className='text-[16px]  font-[500]' >{review?.user?.name}</h4>
                      <Rating name="read-only" value={review?.rating} readOnly size='small' />

                    </div>

                <span className='text-[13px] ' >{review.createdAt}</span>
                <p className='text-[13px] mt-2'>{review?.comment}</p>

                </div>
            </div>

        </div>
                ))
            ):
            <p>No Reviews </p>
        }
     
       </div>

        </>
       }
     
    
    </>
 

    
       {
        error && <p className='text-[20px] text-center text-red-600 w-full'>{error}</p>
       }
       
 </>
  )
}

export default ProductDetails
