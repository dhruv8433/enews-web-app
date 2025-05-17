"use client";

import React from "react";
import MySwiper from "@/app/common/MySwiper";
import { NewsItem } from "@/app/types/home.types";
import SwiperSlideCard from "@/app/common/SwiperSlideCard";
import WeatherCard from "@/app/common/WeatherCard";

interface GridSection1Props {
    slides: NewsItem[];
}

const GridSection1: React.FC<GridSection1Props> = ({ slides }) => {
    // First 8 for swiper
    const swiperSlides = slides.slice(0, 2);
    // Next 4 for grid cards
    const gridCards = slides.slice(2, 6);

    // Prepare JSX for swiper slides
    const swiperSlideElements = swiperSlides.map((news) => (
        <SwiperSlideCard key={news._id} news={news} isSwiper />
    ));

    // Prepare JSX for grid cards
    const gridCardElements = gridCards.map((news) => (
        <SwiperSlideCard key={news._id} news={news} />
    ));

    return (
        <div className="px-10 py-12">
            <h2 className="text-4xl font-extrabold mb-10 text-heading">
                Trending News
            </h2>

            {/* Grid container: 12 columns on md and above, 1 column on small screens */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="col-span-12 md:col-span-8 h-full">
                    <MySwiper slides={swiperSlideElements} autoPlayDelay={3500} />
                </div>

                <div className="col-span-12 md:col-span-4 grid gap-6 grid-cols-1 md:grid-cols-2">
                    <WeatherCard
                        location="New York"
                        temperature={26}
                        condition="Sunny"
                        iconUrl="https://openweathermap.org/img/wn/01d@2x.png"
                        humidity={45}
                        windSpeed={12}
                    />
                    {gridCardElements}
                </div>

            </div>
        </div>
    );
};

export default GridSection1;
