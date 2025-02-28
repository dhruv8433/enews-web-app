'use client';

import React from 'react';
import { Grid } from '@mui/material';
import useHeadlines from '@/app/hooks/useHeadlines';
import { MySwiperPagination } from '@/app/common/MySwiper';
import { SwiperSlide } from 'swiper/react';
import SwiperCard from '@/app/common/SwiperCard';
import SmallCard from '@/app/common/SmallCard';
import WeatherCard from '@/app/common/WeatherCard';
import { SmallCardSkeleton, SwiperCardSkeleton } from '@/app/common/Skeleton.Site';
import ErrorComponent from '@/app/common/ErrorComponent';

export default function HomeSwiper() {
    // Fetch data
    const { error, headlines, loading } = useHeadlines('headlines');

    if (loading) return (<Grid container spacing={2} className='w-full rounded-xl'>
        <Grid item xs={12} md={9} className='my-4'>
            <SwiperCardSkeleton isSwiper={true} />
        </Grid>
        <Grid item xs={12} md={3} >
            {Array.from({ length: 3 }).map((_, index) =>
                <div className="my-4  rounded-xl" key={index}><SmallCardSkeleton /></div>)}
        </Grid>
    </Grid>)

    if (error) return <ErrorComponent error={error} />

    return (
        <div className="my-4">
            <Grid container spacing={2}>
                {/* Swiper left side */}
                <Grid item xs={12} md={9}>
                    {headlines.length > 0 ? (
                        <MySwiperPagination className="h-[700px] w-full rounded-xl">
                            {headlines.map((headline: any) => (
                                <SwiperSlide key={headline._id} className="h-full">
                                    <SwiperCard headline={headline} />
                                </SwiperSlide>
                            ))}
                        </MySwiperPagination>
                    ) : (
                        <div className="text-center text-xl">No headlines available</div>
                    )}
                </Grid>
                {/* Right Side card */}
                <Grid item xs={12} md={3}>
                    {/* static card for weather forecasting */}
                    <WeatherCard />
                    <div className="">
                        {headlines.slice(0, 2).map((headline: any) => (
                            <div className="my-2" key={headline._id}>
                                <SmallCard key={headline._id} headline={headline} />
                            </div>
                        ))}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
