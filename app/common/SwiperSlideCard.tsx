// components/home/SwiperSlideCard.tsx
import React from "react";
import { NewsItem } from "@/app/types/home.types";

interface SwiperSlideCardProps {
  news: NewsItem;
  isSwiper?: boolean;
}

const SwiperSlideCard: React.FC<SwiperSlideCardProps> = ({ news, isSwiper }) => {
  return (
    <a
      href={`/detail/${news._id}/${news.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
      style={{ height: isSwiper ? "480px" : "230px" }}
    >
      {/* Background image with zoom on hover */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 filter brightness-90"
        style={{ backgroundImage: `url(${news.image_url})` }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

      {/* Text content */}
      <div className="absolute bottom-4 left-4 right-4  z-10">
        <p className="text-xs font-semibold opacity-80 tracking-wider mb-1 tag">
          {news.category.name}
        </p>
        <h3 className={`${isSwiper ? "text-2xl" : "text-sm"} font-bold line-clamp-2 text-primary`}>{news.title}</h3>
      </div>
    </a>
  );
};

export default SwiperSlideCard;
