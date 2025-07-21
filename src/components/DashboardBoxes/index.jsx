import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'

import { HiOutlineGift } from "react-icons/hi2";


import { FcComboChart } from "react-icons/fc";
import { FcDoughnutChart } from "react-icons/fc";

import { IoStatsChart } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { RiProductHuntLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";



import { Navigation } from 'swiper/modules';
const DashboardBoxes = () => {
  return (
   <>
   <Swiper
        slidesPerView={4}
        spaceBetween={10}
       navigation={true}
        modules={[Navigation]}
        className="dashboardBoxesSlider"
      >
        <SwiperSlide>
            <div className="box bg-white p-5 cursor-pointer hover:bg-[#fafafa] rounded-md border-1 border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                <LuUsers className='text-[40px]'/>
                <div className="info w-[75%] ">
                    <h3>Total Users</h3>
                    <b>1999</b>

                </div>
                    {/* <FcComboChart className='text-[40px] '/> */}
                    <IoStatsChart className='text-[50px] text-[var(--secondary)]'/>


            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box bg-white p-5 cursor-pointer hover:bg-[#fafafa] rounded-md border-1 border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                <HiOutlineGift className='text-[40px]'/>
                <div className="info w-[75%] ">
                    <h3>Total Orders</h3>
                    <b>1999</b>

                </div>
                    {/* <FcComboChart className='text-[40px] '/> */}
                    <IoStatsChart className='text-[50px] text-[var(--secondary)]'/>


            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box bg-white p-5 cursor-pointer hover:bg-[#fafafa] rounded-md border-1 border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                <RiProductHuntLine className='text-[40px]'/>
                <div className="info w-[75%] ">
                    <h3>Total Products</h3>
                    <b>1999</b>

                </div>
                    {/* <FcComboChart className='text-[40px] '/> */}
                    <IoStatsChart className='text-[50px] text-[var(--secondary)]'/>


            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box bg-white p-5 cursor-pointer hover:bg-[#fafafa] rounded-md border-1 border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                <TbCategory className='text-[40px]'/>
                <div className="info w-[75%] ">
                    <h3>Total Category</h3>
                    <b>1999</b>

                </div>
                    {/* <FcComboChart className='text-[40px] '/> */}
                    <IoStatsChart className='text-[50px] text-[var(--secondary)]'/>


            </div>
        </SwiperSlide>
     
     

        </Swiper>
   </>
  )
}

export default DashboardBoxes
