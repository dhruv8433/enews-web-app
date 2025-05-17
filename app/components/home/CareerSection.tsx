'use client'

import React from 'react'
import SwiperCard from '@/app/common/SwiperCard';
import useHeadlines from '@/app/hooks/useHeadlines'
import { MySwiperFlipEffect } from '@/app/common/MySwiper'
import { SwiperSlide } from 'swiper/react';
import { SwiperCardSkeleton } from '@/app/common/Skeleton.Site';
import ErrorComponent from '@/app/common/ErrorComponent';
import MyHeading from '@/app/common/MyHeading';

const CareerSection = () => {
    const { error, headlines, loading } = useHeadlines("career");
    if (loading) return <SwiperCardSkeleton isSwiper={false} />;
    if (error) return <ErrorComponent error={error} />;
    return (
        <div>
            {/* heading */}
            <MyHeading title='Career' />

            {/* cards */}
            <MySwiperFlipEffect>
                {headlines.map((headline) =>
                    <SwiperSlide className='h-[600px]' key={headline._id}>
                        {/* <SwiperCard headline={headline} isSmallSwiper={true}/> */}
                    </SwiperSlide>
                )}
            </MySwiperFlipEffect>

        </div>
    )
}

export default CareerSection