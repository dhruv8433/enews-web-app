'use client';

import React from 'react';
import { Grid } from '@mui/material';
import useHeadlines from '@/app/hooks/useHeadlines';
import { MySwiperPagination } from '@/app/common/MySwiper';
import { SwiperSlide } from 'swiper/react';
import SwiperCard from '@/app/common/SwiperCard';
import SmallCard from '@/app/common/SmallCard';
import WeatherCard from '@/app/common/WeatherCard';

export default function HomeSwiper() {
    // Fetch data
    const { error, headlines, loading } = useHeadlines('headlines');

    // console.log("Headlines Data:", headlines); // Debugging
    return (
        <div className="my-4">
            <Grid container spacing={2}>
                {/* Swiper left side */}
                <Grid item xs={12} md={9}>
                    {loading ? (
                        <div className="text-center text-xl">Loading...</div>
                    ) : error ? (
                        <div className="text-center text-red-500">Error fetching headlines: {error}</div>
                    ) : headlines.length > 0 ? (
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
                    <WeatherCard city="mumbai" />
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
