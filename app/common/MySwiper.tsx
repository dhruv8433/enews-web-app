// common/MySwiper.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface MySwiperProps {
  slides: React.ReactNode[];
  autoPlayDelay?: number;
  spaceBetween?: number;
  slidesPerView?: number;
  breakpoints?: { [key: number]: { slidesPerView: number } };
}

const MySwiper: React.FC<MySwiperProps> = ({
  slides,
  autoPlayDelay = 3000,
  spaceBetween = 20,
  slidesPerView = 1,
  breakpoints,
}) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      autoplay={{ delay: autoPlayDelay, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      loop
      breakpoints={breakpoints}
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MySwiper;
