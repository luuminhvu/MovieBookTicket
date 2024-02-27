import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.jpg";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function SwiperCarousel() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={slider1} alt="slider1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider2} alt="slider2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider3} alt="slider3" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
