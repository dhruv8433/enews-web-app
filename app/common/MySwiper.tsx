'use client';

import React from 'react';
import { Swiper } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { TypeSwiper } from '../types/swiper.types';

const MySwiperPagination: React.FC<TypeSwiper> = ({ children, className = '' }) => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      modules={[Pagination]}
      className={`mySwiper h-full ${className}`}
    >
      {children}
    </Swiper>
  );
};

export { MySwiperPagination };
