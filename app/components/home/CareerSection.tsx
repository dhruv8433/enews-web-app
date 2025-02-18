'use client'

import React from 'react'
import SwiperCard from '@/app/common/SwiperCard';
import useHeadlines from '@/app/hooks/useHeadlines'
import { MySwiperFlipEffect } from '@/app/common/MySwiper'
import { SwiperSlide } from 'swiper/react';

const CareerSection = () => {
    const { error, headlines, loading } = useHeadlines("career");
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
                {loading ? <h1>Loading..</h1> : error ? <h1 className='text-red-500'>Error in getting data : {error}</h1> : headlines.map((headline) =>
                    <SwiperSlide key={headline._id}>
                        <SwiperCard headline={headline} />
                    </SwiperSlide>
                )}
            </MySwiperFlipEffect>

        </div>
    )
}

export default CareerSection