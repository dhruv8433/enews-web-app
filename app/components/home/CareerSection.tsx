'use client'

import React from 'react'
import SwiperCard from '@/app/common/SwiperCard';
import useHeadlines from '@/app/hooks/useHeadlines'
import { MySwiperFlipEffect } from '@/app/common/MySwiper'
import { SwiperSlide } from 'swiper/react';
import { SwiperCardSkeleton } from '@/app/common/Skeleton.Site';
import ErrorComponent from '@/app/common/ErrorComponent';

const CareerSection = () => {
    const { error, headlines, loading } = useHeadlines("career");
    if (loading) return <SwiperCardSkeleton isSwiper={false} />;
    if (error) return <ErrorComponent error={error} />;
    return (
        <div>
            {/* heading */}
            <div className="custom-heading">
                <div className="p-[5px] bg-blue-700  w-40 flex justify-center text-white">
                    Career
                </div>
            </div>

            {/* cards */}
            <MySwiperFlipEffect>
                {headlines.map((headline) =>
                    <SwiperSlide key={headline._id}>
                        <SwiperCard headline={headline} />
                    </SwiperSlide>
                )}
            </MySwiperFlipEffect>

        </div>
    )
}

export default CareerSection