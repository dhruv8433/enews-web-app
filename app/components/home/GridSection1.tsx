"use client";

import React from "react";
import MySwiper from "@/app/common/MySwiper";
import { NewsItem } from "@/app/types/home.types";
import SwiperSlideCard from "@/app/common/SwiperSlideCard";
import WeatherCard from "@/app/common/WeatherCard";

interface GridSection1Props {
    slides: NewsItem[];
    isTravel?: boolean;
}

const GridSection1: React.FC<GridSection1Props> = ({ slides, isTravel }) => {
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
        <div>
            {/* Grid container: 12 columns on md and above, 1 column on small screens */}
            {isTravel && <h2 className="text-2xl my-4 heading font-extrabold">Travel News</h2>}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-4">
                {!isTravel && <div className={"col-span-12 md:col-span-8 h-full"}>
                    <MySwiper slides={swiperSlideElements} autoPlayDelay={3500} />
                </div>}

                <div className="col-span-12 md:col-span-4 grid gap-6 grid-cols-1 md:grid-cols-2">
                    {!isTravel && <WeatherCard
                        location="New York"
                        temperature={26}
                        condition="Sunny"
                        iconUrl="https://openweathermap.org/img/wn/01d@2x.png"
                        humidity={45}
                        windSpeed={12}
                    />}
                    {gridCardElements}
                </div>

                {isTravel && <div className={"col-span-12 md:col-span-8 h-full"}>
                    <MySwiper slides={swiperSlideElements} autoPlayDelay={3500} />
                </div>
                }
            </div>
        </div>
    );
};

export default GridSection1;
