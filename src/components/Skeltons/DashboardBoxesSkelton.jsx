import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Skeleton from "@mui/material/Skeleton";

const DashboardBoxesSkelton = () => {
  return (
    <Swiper
      spaceBetween={12}
      modules={[Pagination]}
      pagination={{ clickable: true }}
      breakpoints={{
        0: { slidesPerView: 1.2 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
      className="!overflow-visible"
    >
      {[1, 2, 3, 4].map((i) => (
        <SwiperSlide key={i} className="pb-5">
          <div className="relative bg-gray-100 shadow-md p-5 min-h-[100px] rounded-2xl flex items-center gap-4">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="flex-1">
              <Skeleton width="60%" height={20} />
              <Skeleton width="40%" height={30} />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DashboardBoxesSkelton;
