"use client";

import React from "react";
import Link from "next/link";
import { NewsItem } from "@/app/types/home.types";

interface HorizontalCardProps {
    news: NewsItem;
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({ news }) => {
    return (
        <Link href={`/detail/${news._id}/${news.slug}`} passHref>
            <div className="flex flex-col md:flex-row card shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer my-4">
                {/* Image Section */}
                <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                    <img
                        src={news.image_url}
                        alt={news.title}
                        className="object-cover"
                    />
                </div>
                {/* Content Section */}
                <div className="p-6 flex flex-col justify-center w-full md:w-2/3">
                    <p className="text-xs font-semibold uppercase text-secondary mb-2 tag">
                        {news.category.name}
                    </p>
                    <h3 className="text-xl font-bold mb-4 line-clamp-2">
                        {news.title}
                    </h3>
                    <p className="text-sm text-secondary">Click to read more...</p>
                </div>
            </div>
        </Link>
    );
};

export default HorizontalCard;
