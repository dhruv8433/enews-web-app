'use client';

import React from 'react';
import { Grid } from '@mui/material';
import { MySwiperPagination } from '@/app/common/MySwiper';
import { SwiperSlide } from 'swiper/react';
import SwiperCard from '@/app/common/SwiperCard';
import SmallCard from '@/app/common/SmallCard';
import WeatherCard from '@/app/common/WeatherCard';
import { SmallCardSkeleton, SwiperCardSkeleton } from '@/app/common/Skeleton.Site';
import ErrorComponent from '@/app/common/ErrorComponent';
import { NewsArticle } from '@/app/types/home.types';
import { ErrorType } from '@/app/types/error,types';

type HomeSwiperProps = {
  headlines?: NewsArticle[];  // <-- array of NewsArticle, not NewsData
  loading: boolean;
  error: ErrorType | null;
};

export default function HomeSwiper({ headlines, loading, error }: HomeSwiperProps) {
  if (loading) {
    return (
      <Grid container spacing={2} className="w-full rounded-xl">
        <Grid item xs={12} md={9} className="my-4">
          <SwiperCardSkeleton isSwiper={true} />
        </Grid>
        <Grid item xs={12} md={3}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="my-4 rounded-xl" key={index}>
              <SmallCardSkeleton />
            </div>
          ))}
        </Grid>
      </Grid>
    );
  }

  if (error) return <ErrorComponent error={error} />;

  return (
    <div className="my-4">
      <Grid container spacing={2}>
        {/* Left Side Swiper */}
        <Grid item xs={12} md={9}>
          {headlines && headlines.length > 0 ? (
            <MySwiperPagination className="max-h-[740px] w-full rounded-xl">
              {headlines.map((headline) => (
                <SwiperSlide key={headline._id} className="h-full">
                  <SwiperCard article={headline} />
                </SwiperSlide>
              ))}
            </MySwiperPagination>
          ) : (
            <div className="text-center text-xl">No headlines available</div>
          )}
        </Grid>

        {/* Right Side Weather + Popular News */}
        <Grid item xs={12} md={3}>
          <WeatherCard />
          <div className="mt-4">
            {headlines?.slice(0, 2).map((headline) => (
              <div className="my-2" key={headline._id}>
                <SmallCard article={headline} />
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
