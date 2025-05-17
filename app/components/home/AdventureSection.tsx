'use client'

import ErrorComponent from '@/app/common/ErrorComponent'
import MyHeading from '@/app/common/MyHeading'
import { MySwiperFlipEffect } from '@/app/common/MySwiper'
import { SwiperCardSkeleton } from '@/app/common/Skeleton.Site'
import SwiperCard from '@/app/common/SwiperCard'
import useHeadlines from '@/app/hooks/useHeadlines'
import React from 'react'
import { SwiperSlide } from 'swiper/react'

const AdventureSection = () => {
  
  const { error, headlines, loading } = useHeadlines('Adventure');
  if (loading) return <SwiperCardSkeleton isSwiper={false} />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <div>
      {/* heading */}
      <MyHeading title='Adventure' />

      {/* cards */}
      <MySwiperFlipEffect>
        {headlines.map((headline) =>
          <SwiperSlide key={headline._id}>
            {/* <SwiperCard headline={headline} isSmallSwiper={true} /> */}
          </SwiperSlide>
        )}
      </MySwiperFlipEffect>
    </div>
  )
}

export default AdventureSection