import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useSelector } from "react-redux";

export default function SwiperCarousel() {
  const poster = useSelector((state) => state.movie.poster);
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
        {poster &&
          poster
            .filter((item) => item.ActivePoster === 1)
            .map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item.PosterURL} alt="slider" />
              </SwiperSlide>
            ))}
      </Swiper>
    </>
  );
}
