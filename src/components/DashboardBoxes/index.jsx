import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode,Pagination } from "swiper/modules";

import { LuUsers } from "react-icons/lu";
import { HiOutlineGift } from "react-icons/hi2";
import { RiProductHuntLine } from "react-icons/ri";
import { TbCategory, TbCategoryFilled } from "react-icons/tb";
import { IoStatsChart } from "react-icons/io5";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode"
import DashboardBoxesSkelton from "../Skeltons/DashboardBoxesSkelton";
import { getDashboardDetails } from "../../features/dashboard/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import './dashboardStyle.css'
const ranges = ["today", "lastWeek", "lastMonth", "thisYear"];

const DashboardBoxes = () => {
  const [selectedRange, setSelectedRange] = useState("lastMonth");
  const{stats,loading}=useSelector(state=>state.dashboard)
  const dispatch = useDispatch()



  useEffect(()=>{
    dispatch(getDashboardDetails())
    

  },[])

  return (
    <div >
     <div className="mb-4 flex flex-wrap gap-2">
  {ranges.map((r) => (
    <button
      key={r}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
        ${selectedRange === r 
          ? "bg-blue-600 text-white" 
          : "bg-gray-100 hover:bg-gray-200"}`}
      onClick={() => setSelectedRange(r)}
    >
      {r}
    </button>
  ))}
</div>

{
  !stats? <DashboardBoxesSkelton/> : (

    <div className="overflow-y-hidden dashboard-box">

      <Swiper
      className="!overflow-y-visible "
      
        spaceBetween={12}
  modules={[Pagination,FreeMode]}
  freeMode={true}
  pagination={{ clickable: true }}
        breakpoints={{
           0: { slidesPerView: 1.1 },  
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 4 },

        }}
        >
        <SwiperSlide className="pb-5 ">
          <div className="relative hover:scale-101  box bg-gradient-to-r from-green-500 to-green-600 shadow-md p-5 min-h-[100px] rounded-2xl  flex items-center gap-4">
            <LuUsers className="text-[40px] text-white" />
           <div className="info  
">
  <p className="text-sm text-white/80">Total Users</p>
  <p className="text-2xl font-bold text-white">{stats.users[selectedRange]}</p>
</div>
<IoStatsChart className="text-[80px] text-white/20 absolute bottom-2 right-2" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="hover:scale-101  box bg-gradient-to-r from-blue-500 to-blue-600 shadow-md p-5 min-h-[100px] rounded-2xl  flex items-center gap-4">
            <HiOutlineGift className="text-[40px] text-white" />
           <div className="info  
">
  <p className="text-sm text-white/80">Total Orders</p>
  <p className="text-2xl font-bold text-white">{stats.orders[selectedRange]}</p>
</div>
<IoStatsChart className="text-[80px] text-white/20 absolute bottom-2 right-2" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="hover:scale-101  box bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-md p-5 min-h-[100px] rounded-2xl  flex items-center gap-4">
            <RiProductHuntLine className="text-[40px] text-white" />
           <div className="info  
">
  <p className="text-sm text-white/80">Total Products</p>
  <p className="text-2xl font-bold text-white">{stats.products[selectedRange]}</p>
</div>
<IoStatsChart className="text-[80px] text-white/20 absolute bottom-2 right-2" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="hover:scale-101  box bg-gradient-to-r from-purple-500 to-purple-600 shadow-md p-5 min-h-[100px] rounded-2xl  flex items-center gap-4">
            <TbCategory className="text-[40px] text-white" />
           <div className="info  
">
  <p className="text-sm text-white/80">Total Categories</p>
  <p className="text-2xl font-bold text-white">{stats.categories[selectedRange]}</p>
</div>
<IoStatsChart className="text-[80px] text-white/20 absolute bottom-2 right-2" />
          </div>
        </SwiperSlide>

    

   

     
      </Swiper>
    </div>

  )
}

    </div>
  );
};

export default DashboardBoxes;
