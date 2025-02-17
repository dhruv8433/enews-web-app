'use client';

import React from 'react';
import { Grid } from '@mui/material';
import useHeadlines from '@/app/hooks/useHeadlines';
import { MySwiperPagination } from '@/app/common/MySwiper';
import { SwiperSlide } from 'swiper/react';
import SwiperCard from '@/app/common/SwiperCard';

export default function HomeSwiper() {
    // Fetch data
    const { error, headlines, loading } = useHeadlines('headlines');
    
    console.log("Headlines Data:", headlines); // Debugging

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={9}>
                {loading ? (
                    <div className="text-center text-xl">Loading...</div>
                ) : error ? (
                    <div className="text-center text-red-500">Error fetching headlines: {error}</div>
                ) : headlines.length > 0 ? (
                    <MySwiperPagination className="h-[700px] w-full my-4 rounded-xl">
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
        </Grid>
    );
}
