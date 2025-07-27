"use client";

import React from "react";
import MySwiper from "@/app/common/MySwiper";
import { NewsItem } from "@/app/types/home.types";
import SwiperSlideCard from "@/app/common/SwiperSlideCard";
import WeatherCard from "@/app/common/WeatherCard";

interface GridSection1Props {
  slides: NewsItem[];
  isTravel?: boolean;
  loading?: boolean;
}

/* ------------------------------------------------------------------ */
/* Skeleton helpers                                                   */
/* ------------------------------------------------------------------ */
const SkeletonSwiper = () => (
  <div className="col-span-12 md:col-span-8 h-[350px] md:h-full">
    <div className="h-full w-full animate-pulse rounded-xl bg-gray-200" />
  </div>
);

const SkeletonCard = () => (
  <div className="h-64 w-full animate-pulse rounded-xl bg-gray-200" />
);

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */
const GridSection1: React.FC<GridSection1Props> = ({
  slides,
  isTravel,
  loading,
}) => {
  const swiperSlides = slides.slice(0, 2);
  const gridCards = slides.slice(2, 6);

  /* -------------------- skeleton mode -------------------- */
  if (loading) {
    return (
      <div className="my-8">
        {isTravel && (
          <h2 className="heading my-4 text-2xl font-extrabold">
            Travel News
          </h2>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Left: skeleton swiper */}
          <SkeletonSwiper />

          {/* Right: skeleton grid */}
          <div className="col-span-12 grid grid-cols-1 gap-6 md:col-span-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* -------------------- real data -------------------- */
  const swiperSlideElements = swiperSlides.map((news) => (
    <SwiperSlideCard key={news._id} news={news} isSwiper />
  ));

  const gridCardElements = gridCards.map((news) => (
    <SwiperSlideCard key={news._id} news={news} />
  ));

  return (
    <div className="my-8">
      {isTravel && (
        <h2 className="heading my-4 text-2xl font-extrabold">
          Travel News
        </h2>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {!isTravel && (
          <div className="col-span-12 h-full md:col-span-8">
            <MySwiper slides={swiperSlideElements} autoPlayDelay={3500} />
          </div>
        )}

        <div className="col-span-12 grid grid-cols-1 gap-6 md:col-span-4 md:grid-cols-2">
          {!isTravel && (
            <WeatherCard
              location="New York"
              temperature={26}
              condition="Sunny"
              iconUrl="https://openweathermap.org/img/wn/01d@2x.png"
              humidity={45}
              windSpeed={12}
            />
          )}
          {gridCardElements}
        </div>

        {isTravel && (
          <div className="col-span-12 h-full md:col-span-8">
            <MySwiper slides={swiperSlideElements} autoPlayDelay={3500} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GridSection1;