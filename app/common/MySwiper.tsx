'use client';

import React from 'react';
import { Swiper } from 'swiper/react';
import { Autoplay, EffectFlip, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-flip';
import { TypeSwiper } from '../types/swiper.types';

const MySwiperPagination: React.FC<TypeSwiper> = ({ children, className = '' }) => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      autoplay={true}
      modules={[Pagination, Autoplay]}
      className={`mySwiper h-full ${className}`}
    >
      {children}
    </Swiper>
  );
};

const MySwiperFlipEffect: React.FC<TypeSwiper> = ({ children, className = '' }) => {
  return (
    <Swiper
    effect={'flip'}
    grabCursor={true}
    pagination={true}
    modules={[EffectFlip, Pagination, Autoplay]}
    className={`mySwiper h-[500px] ${className}`}
    autoplay={true}
    >
      {children}
    </Swiper>
  )
}

export { MySwiperPagination, MySwiperFlipEffect };
